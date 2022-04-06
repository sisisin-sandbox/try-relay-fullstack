import React from 'react';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { Links } from '../Links';
import { CreatePostMutation } from './__generated__/CreatePostMutation.graphql';

const operation = graphql`
  mutation CreatePostMutation($input: PostCreateInput!, $connections: [ID!]!) {
    postCreate(input: $input) {
      post {
        id
        postId
        userId
        title
        body
      }
      postEdge @appendEdge(connections: $connections) {
        node {
          id
        }
      }
    }
  }
`;

export function CreatePost() {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [commit, isInFlight] = useMutation<CreatePostMutation>(operation);

  const submit = () => {
    if (isInFlight) return;

    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;

    if (title == null || title == '' || body == null || body == '') {
      console.log('validation error');
      return;
    }

    commit({
      variables: {
        input: { title, body },
        connections: [ConnectionHandler.getConnectionID('root', 'PostList_posts')],
      },
      onCompleted: (data) => {
        if (data.postCreate == null) {
          console.error('postCreate is null');
          return;
        }
        navigate(`/posts`);
        // navigate(`/posts/${data.postCreate.post.postId}`);
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
          Create
        </button>
      </div>
      <Links></Links>
    </>
  );
}
