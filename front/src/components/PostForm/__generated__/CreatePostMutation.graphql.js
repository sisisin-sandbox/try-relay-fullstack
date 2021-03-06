/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PostCreateErrorCode = "PROHIBITED_WORDS_EXIST" | "TITLE_DOES_NOT_EXIST" | "%future added value";
export type PostCreateInput = {|
  body: string,
  title: string,
|};
export type CreatePostMutationVariables = {|
  input: PostCreateInput,
  connections: $ReadOnlyArray<string>,
|};
export type CreatePostMutationResponse = {|
  +postCreate: ?{|
    +result: ?{|
      +post: {|
        +id: string,
        +postId: string,
        +userId: string,
        +title: string,
        +body: string,
      |},
      +postEdge: {|
        +node: {|
          +id: string
        |}
      |},
    |},
    +userErrors: $ReadOnlyArray<{|
      +__typename: "PostCreateTitleDoesNotExist",
      +message: string,
      +code: PostCreateErrorCode,
    |} | {|
      +__typename: "PostCreateProhibitedWordsExist",
      +message: string,
      +code: PostCreateErrorCode,
      +words: $ReadOnlyArray<string>,
    |} | {|
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      +__typename: "%other"
    |}>,
  |}
|};
export type CreatePostMutation = {|
  variables: CreatePostMutationVariables,
  response: CreatePostMutationResponse,
|};
*/


/*
mutation CreatePostMutation(
  $input: PostCreateInput!
) {
  postCreate(input: $input) {
    result {
      post {
        id
        postId
        userId
        title
        body
      }
      postEdge {
        node {
          id
        }
      }
    }
    userErrors {
      __typename
      ... on PostCreateTitleDoesNotExist {
        __typename
        message
        code
      }
      ... on PostCreateProhibitedWordsExist {
        __typename
        message
        code
        words
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Post",
  "kind": "LinkedField",
  "name": "post",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "postId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "PostEdge",
  "kind": "LinkedField",
  "name": "postEdge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "words",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "PostCreatePayload",
        "kind": "LinkedField",
        "name": "postCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostCreateSucceededResult",
            "kind": "LinkedField",
            "name": "result",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userErrors",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "type": "PostCreateTitleDoesNotExist",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "type": "PostCreateProhibitedWordsExist",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreatePostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "PostCreatePayload",
        "kind": "LinkedField",
        "name": "postCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostCreateSucceededResult",
            "kind": "LinkedField",
            "name": "result",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "appendEdge",
                "key": "",
                "kind": "LinkedHandle",
                "name": "postEdge",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userErrors",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "type": "PostCreateTitleDoesNotExist",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "type": "PostCreateProhibitedWordsExist",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4a1284f252f530a013326fc8eefa6e86",
    "id": null,
    "metadata": {},
    "name": "CreatePostMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePostMutation(\n  $input: PostCreateInput!\n) {\n  postCreate(input: $input) {\n    result {\n      post {\n        id\n        postId\n        userId\n        title\n        body\n      }\n      postEdge {\n        node {\n          id\n        }\n      }\n    }\n    userErrors {\n      __typename\n      ... on PostCreateTitleDoesNotExist {\n        __typename\n        message\n        code\n      }\n      ... on PostCreateProhibitedWordsExist {\n        __typename\n        message\n        code\n        words\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '67b659bdfd783d1bfdd85afaecccc1a8';

export default node;
