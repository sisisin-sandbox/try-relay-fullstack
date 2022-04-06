/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PostQueryVariables = {
    postId: string;
};
export type PostQueryResponse = {
    readonly postById: {
        readonly id: string;
        readonly postId: string;
        readonly userId: string;
        readonly title: string;
        readonly body: string;
    } | null;
};
export type PostQuery = {
    readonly response: PostQueryResponse;
    readonly variables: PostQueryVariables;
};



/*
query PostQuery(
  $postId: String!
) {
  postById(postId: $postId) {
    id
    postId
    userId
    title
    body
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "postId",
        "variableName": "postId"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "postById",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e4ee099d0c453772773f448902f8d8a1",
    "id": null,
    "metadata": {},
    "name": "PostQuery",
    "operationKind": "query",
    "text": "query PostQuery(\n  $postId: String!\n) {\n  postById(postId: $postId) {\n    id\n    postId\n    userId\n    title\n    body\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd49b23016e0186950ee2813d7b6dab4f';
export default node;
