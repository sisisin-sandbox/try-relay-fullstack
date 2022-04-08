// @flow

import * as React from 'react';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { type CreatePostMutation } from './__generated__/CreatePostMutation.graphql';

const operation = graphql`
  mutation CreatePostMutation($input: PostCreateInput!, $connections: [ID!]!) {
    postCreate(input: $input) {
      result {
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
      userErrors {
        ... on PostCreateTitleDoesNotExist {
          code
          message
          field
        }
        ... on PostCreateProhibitedWordsExist {
          code
          message
          field
          words
        }
      }
    }
  }
`;

export const CreatePost:React.AbstractComponent<{}> = ()=> {
  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const bodyRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [commit, isInFlight] = useMutation<CreatePostMutation>(operation);
  const [errorResult, setErrorResult] = React.useState<{ [key: string]: string[] }>({});

  const submit = () => {
    if (isInFlight) return;

    const title: string = (titleRef.current?.value: any);
    const body: string = (bodyRef.current?.value: any);

    commit({
      variables: {
        input: { title, body },
        connections: [ConnectionHandler.getConnectionID('root', 'PostList_posts')],
      },
      onCompleted: (data) => {
        if ((data.postCreate?.userErrors ?? []).length > 0) {
          setErrorResult({ something: ['some error occurred'] });
        }
        if (data.postCreate?.result == null) {
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
        {errorResult.title && errorResult.title.map((error) => <span style={{ color: 'red' }}>{error}</span>)}
      </div>
      <div>
        body: <input type="text" name="body" ref={bodyRef} />
      </div>
      {errorResult.something?.map((error) => (
        <span style={{ color: 'red' }}>{error}</span>
      ))}
      <div>
        <button disabled={isInFlight} onClick={submit}>
          Create
        </button>
      </div>
    </>
  );
}
