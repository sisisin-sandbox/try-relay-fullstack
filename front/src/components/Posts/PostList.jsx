// @flow
import * as React from 'react';

import { graphql } from 'react-relay';
import { ConnectionHandler, useFragment, useMutation, useRelayEnvironment } from 'react-relay/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { type PostListFragment$key } from './__generated__/PostListFragment.graphql';
import { type PostListMutation } from './__generated__/PostListMutation.graphql';

const operation = graphql`
  fragment PostListFragment on Query
    @argumentDefinitions(first: { type: "Int", defaultValue: 30 }, after: { type: "ID" }) {
    posts(first: $first, after: $after) @connection(key: "PostList_posts") {
      edges {
        node {
          id
          postId
          userId
          title
          body
        }
      }
    }
  }
`;

const deleteOperation = graphql`
  mutation PostListMutation($input: PostDeleteInput!, $connections: [ID!]!) {
    postDelete(input: $input) {
      deletedPostId @deleteEdge(connections: $connections)
      _deletedPostId: deletedPostId @deleteRecord
    }
  }
`;

type Props = {
  queryRef: PostListFragment$key,
};

const DeleteButton = ({ id, postId }: { id: string, postId: string }) => {
  const e = useRelayEnvironment();
  const [commitDeletePost, isInFlightDeletePost] = useMutation<PostListMutation>(deleteOperation);

  const deletePost = () => {
    commitDeletePost({
      variables: { input: { postId }, connections: [ConnectionHandler.getConnectionID('root', 'PostList_posts')] },
      onCompleted: (res) => {
        console.log(
          e
            .getStore()
            .getSource()
            .toJSON(),
        );
      },
    });
  };

  return (
    <button disabled={isInFlightDeletePost} onClick={deletePost}>
      delete
    </button>
  );
};

export const PostList: React.AbstractComponent<Props> = ({ queryRef }) => {
  const data = useFragment(operation, queryRef);
  const navigate = useNavigate();
  const navigateEdit = (id: string) => () => {
    navigate(`/posts/${id}/edit`);
  };

  return (
    <div className="App">
      <div>
        <ul>
          {data.posts.edges.map((edge) => {
            if (edge == null) return null;
            const { node } = edge;
            return (
              <li key={node.id}>
                id: {node.id} postId: {node.postId} <Link to={`/posts/${node.id}`}>title: {node.title}</Link>
                <button onClick={navigateEdit(node.id)}>edit</button>{' '}
                <DeleteButton id={node.id} postId={node.postId}></DeleteButton>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
