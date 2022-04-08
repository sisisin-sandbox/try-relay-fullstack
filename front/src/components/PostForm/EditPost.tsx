import React from 'react';
import { ConnectionHandler, graphql, PreloadedQuery, useMutation, usePreloadedQuery } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';
import GQLQueryLoader, { GenerateQueryLoaderProps } from '../Loader';
import { EditPostMutation } from './__generated__/EditPostMutation.graphql';
import { EditPostQuery } from './__generated__/EditPostQuery.graphql';

const queryOperation = graphql`
  query EditPostQuery($id: ID!) {
    postById(id: $id) {
      id
      postId
      userId
      title
      body
    }
  }
`;

const mutationOperation = graphql`
  mutation EditPostMutation($input: PostEditInput!, $connections: [ID!]!) {
    postEdit(input: $input) {
      post {
        id
        postId
        userId
        title
        body
      }
      postEdge @prependEdge(connections: $connections) {
        node {
          id
        }
      }
    }
  }
`;

type Props = GenerateQueryLoaderProps<EditPostQuery>;
const Content = ({ refresh, queryRef }: Props) => {
  const data = usePreloadedQuery(queryOperation, queryRef);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [commit, isInFlight] = useMutation<EditPostMutation>(mutationOperation);

  if (data.postById == null) {
    return null;
  }
  const post = data.postById;

  const submit = () => {
    if (isInFlight) return;

    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;

    commit({
      variables: {
        input: { id: post.id, title: title === '' ? null : title, body: body === '' ? null : body },
        connections: [ConnectionHandler.getConnectionID('root', 'PostList_posts')],
      },
      onCompleted: (data) => {
        if (data.postEdit == null) {
          console.error('postEdit is null');
          return;
        }
        navigate(`/posts`);
      },
    });
  };
  return (
    <>
      <div>
        title: <input type="text" name="title" ref={titleRef} defaultValue={post.title} />
      </div>
      <div>
        body: <input type="text" name="body" ref={bodyRef} defaultValue={post.body} />
      </div>
      <div>
        <button disabled={isInFlight} onClick={submit}>
          submit edit
        </button>
      </div>
    </>
  );
};

export function EditPost() {
  const { id } = useParams();
  if (id == null) {
    return <>'No post id'</>;
  }

  return (
    <GQLQueryLoader
      variables={{ id }}
      query={queryOperation}
      render={(queryRef: PreloadedQuery<EditPostQuery>, refresh) => <Content queryRef={queryRef} refresh={refresh} />}
    ></GQLQueryLoader>
  );
}
