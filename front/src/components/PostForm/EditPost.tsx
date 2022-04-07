import React from 'react';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';
import { EditPostMutation } from './__generated__/EditPostMutation.graphql';

const operation = graphql`
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

export function EditPost() {
  const postId = useParams().id;
  if (postId == null) {
    return <>'No post id'</>;
  }
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [commit, isInFlight] = useMutation<EditPostMutation>(operation);

  const submit = () => {
    if (isInFlight) return;

    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;

    commit({
      variables: {
        input: { id: postId, title: title === '' ? null : title, body: body === '' ? null : body },
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
        title: <input type="text" name="title" ref={titleRef} />
      </div>
      <div>
        body: <input type="text" name="body" ref={bodyRef} />
      </div>
      <div>
        <button disabled={isInFlight} onClick={submit}>
          submit edit
        </button>
      </div>
    </>
  );
}
