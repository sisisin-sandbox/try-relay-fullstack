/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PostCreateInput = {
    body: string;
    title: string;
};
export type CreatePostMutationVariables = {
    input: PostCreateInput;
};
export type CreatePostMutationResponse = {
    readonly postCreate: {
        readonly post: {
            readonly id: string;
            readonly postId: string;
            readonly userId: string;
            readonly title: string;
            readonly body: string;
        };
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
    post {
      id
      postId
      userId
      title
      body
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "PostCreatePayload",
    "kind": "LinkedField",
    "name": "postCreate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreatePostMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "391e21766968fe1644a4f44fd1fbc573",
    "id": null,
    "metadata": {},
    "name": "CreatePostMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePostMutation(\n  $input: PostCreateInput!\n) {\n  postCreate(input: $input) {\n    post {\n      id\n      postId\n      userId\n      title\n      body\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '389d23e640abe0bc1a80efe1886c06d1';
export default node;
