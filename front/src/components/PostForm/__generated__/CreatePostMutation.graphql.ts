/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PostCreateErrorCode = "PROHIBITED_WORDS_EXIST" | "TITLE_DOES_NOT_EXIST" | "%future added value";
export type PostCreateInput = {
    body: string;
    title: string;
};
export type CreatePostMutationVariables = {
    input: PostCreateInput;
    connections: Array<string>;
};
export type CreatePostMutationResponse = {
    readonly postCreate: {
        readonly result: {
            readonly post: {
                readonly id: string;
                readonly postId: string;
                readonly userId: string;
                readonly title: string;
                readonly body: string;
            };
            readonly postEdge: {
                readonly node: {
                    readonly id: string;
                };
            };
        } | null;
        readonly userErrors: ReadonlyArray<{
            readonly code?: PostCreateErrorCode | undefined;
            readonly message?: string | undefined;
            readonly field?: string | undefined;
            readonly words?: ReadonlyArray<string> | undefined;
        }>;
    } | null;
};
export type CreatePostMutation = {
    readonly response: CreatePostMutationResponse;
    readonly variables: CreatePostMutationVariables;
};



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
*/

const node: ConcreteRequest = (function(){
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
  "name": "code",
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
  "name": "field",
  "storageKey": null
},
v9 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/)
  ],
  "type": "PostCreateTitleDoesNotExist",
  "abstractKey": null
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "words",
      "storageKey": null
    }
  ],
  "type": "PostCreateProhibitedWordsExist",
  "abstractKey": null
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
              (v9/*: any*/),
              (v10/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "55618368480838a4e9a9f8f64abdb523",
    "id": null,
    "metadata": {},
    "name": "CreatePostMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePostMutation(\n  $input: PostCreateInput!\n) {\n  postCreate(input: $input) {\n    result {\n      post {\n        id\n        postId\n        userId\n        title\n        body\n      }\n      postEdge {\n        node {\n          id\n        }\n      }\n    }\n    userErrors {\n      __typename\n      ... on PostCreateTitleDoesNotExist {\n        code\n        message\n        field\n      }\n      ... on PostCreateProhibitedWordsExist {\n        code\n        message\n        field\n        words\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '795086dcdc7d5e900da2b82c1fddd2f1';
export default node;
