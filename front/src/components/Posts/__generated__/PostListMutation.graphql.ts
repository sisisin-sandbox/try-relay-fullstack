/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PostDeleteInput = {
    postId: string;
};
export type PostListMutationVariables = {
    input: PostDeleteInput;
    connections: Array<string>;
};
export type PostListMutationResponse = {
    readonly postDelete: {
        readonly deletedPostId: string;
    } | null;
};
export type PostListMutation = {
    readonly response: PostListMutationResponse;
    readonly variables: PostListMutationVariables;
};



/*
mutation PostListMutation(
  $input: PostDeleteInput!
) {
  postDelete(input: $input) {
    deletedPostId
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
  "name": "deletedPostId",
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
    "name": "PostListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "PostDeletePayload",
        "kind": "LinkedField",
        "name": "postDelete",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "PostListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "PostDeletePayload",
        "kind": "LinkedField",
        "name": "postDelete",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "deletedPostId",
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
      }
    ]
  },
  "params": {
    "cacheID": "7da2e6815c58751c71761cb2cd5e59a2",
    "id": null,
    "metadata": {},
    "name": "PostListMutation",
    "operationKind": "mutation",
    "text": "mutation PostListMutation(\n  $input: PostDeleteInput!\n) {\n  postDelete(input: $input) {\n    deletedPostId\n  }\n}\n"
  }
};
})();
(node as any).hash = '1efd824699df560ee21238ed4a42b63d';
export default node;
