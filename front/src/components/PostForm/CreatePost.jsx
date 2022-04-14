// @flow

import * as React from 'react';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { type CreatePostMutation } from './__generated__/CreatePostMutation.graphql';
import type { PostCreateErrorCode } from './__generated__/CreatePostMutation.graphql';

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
        ... on UserError {
          __typename
          message
        }
        ... on PostCreateTitleDoesNotExist {
          code
        }
        ... on PostCreateProhibitedWordsExist {
          code
          words
        }
      }
    }
  }
`;

export const CreatePost: React.AbstractComponent<{}> = () => {
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
        const errorMessages: { [key: string]: string[] } = {};
        (data.postCreate?.userErrors ?? []).forEach((err) => {
          if (err.__typename === 'PostCreateTitleDoesNotExist') {
            const {
              code,
              message,
            }: {
              +message: string,
              +code: PostCreateErrorCode,
            } = (err: any);

            if (errorMessages.title == null) errorMessages.title = [];
            errorMessages.title.push(message);
          }

          if (err.__typename === 'PostCreateProhibitedWordsExist') {
            const {
              code,
              message,
              words,
            }: {
              +message: string,
              +code: PostCreateErrorCode,
              +words: string[],
            } = (err: any);

            if (errorMessages.title == null) errorMessages.title = [];
            errorMessages.title.push(message);
          }
        }, {});

        if (Object.keys(errorMessages).length > 0) {
          setErrorResult(errorMessages);
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
        {errorResult.title &&
          errorResult.title.map((error, i) => (
            <span key={i} style={{ color: 'red' }}>
              {error}
            </span>
          ))}
      </div>
      <div>
        body: <input type="text" name="body" ref={bodyRef} />
      </div>
      {errorResult.something?.map((error, i) => (
        <span key={i} style={{ color: 'red' }}>
          {error}
        </span>
      ))}
      <div>
        <button disabled={isInFlight} onClick={submit}>
          Create
        </button>
      </div>
    </>
  );
};
