/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PostQueryVariables = {
    id: string;
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
  $id: ID!
) {
  postById(id: $id) {
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
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
    "cacheID": "47dad6a66ec2db026b9f049306ae6051",
    "id": null,
    "metadata": {},
    "name": "PostQuery",
    "operationKind": "query",
    "text": "query PostQuery(\n  $id: ID!\n) {\n  postById(id: $id) {\n    id\n    postId\n    userId\n    title\n    body\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b8ef9f09739ce7eb19f6474837060f12';
export default node;
