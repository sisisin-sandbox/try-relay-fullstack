import { graphql } from 'react-relay';
import { ConnectionHandler, useFragment, useMutation } from 'react-relay/hooks';
import { Link } from 'react-router-dom';
import { PostListFragment$key } from './__generated__/PostListFragment.graphql';
import { PostListMutation } from './__generated__/PostListMutation.graphql';

const operation = graphql`
  fragment PostListFragment on Query
  @argumentDefinitions(first: { type: "Int", defaultValue: 30 }, after: { type: "String" }) {
    posts(first: $first) @connection(key: "PostList_posts") {
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
    }
  }
`;

type Props = {
  queryRef: PostListFragment$key;
};

const DeleteButton = ({ postId }: { postId: string }) => {
  const [commitDeletePost, isInFlightDeletePost] = useMutation<PostListMutation>(deleteOperation);

  const deletePost = () => {
    commitDeletePost({
      variables: { input: { postId }, connections: [ConnectionHandler.getConnectionID('root', 'PostList_posts')] },
    });
  };

  return (
    <button disabled={isInFlightDeletePost} onClick={deletePost}>
      delete
    </button>
  );
};
export const PostList = ({ queryRef }: Props) => {
  const data = useFragment(operation, queryRef);
  return (
    <div className="App">
      <div>
        <ul>
          {data.posts.edges.map((edge) => {
            if (edge == null) return null;
            const { node } = edge;
            return (
              <li key={node.id}>
                <Link to={`/posts/${node.postId}`}>
                  id: {node.postId},title: {node.title}
                </Link>
                <button>edit</button> <DeleteButton postId={node.postId}></DeleteButton>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
