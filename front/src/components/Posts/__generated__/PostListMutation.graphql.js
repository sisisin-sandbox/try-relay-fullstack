/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PostDeleteInput = {|
  postId: string
|};
export type PostListMutationVariables = {|
  input: PostDeleteInput,
  connections: $ReadOnlyArray<string>,
|};
export type PostListMutationResponse = {|
  +postDelete: ?{|
    +deletedPostId: string,
    +_deletedPostId: string,
  |}
|};
export type PostListMutation = {|
  variables: PostListMutationVariables,
  response: PostListMutationResponse,
|};
*/


/*
mutation PostListMutation(
  $input: PostDeleteInput!
) {
  postDelete(input: $input) {
    deletedPostId
    _deletedPostId: deletedPostId
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
  "name": "deletedPostId",
  "storageKey": null
},
v4 = {
  "alias": "_deletedPostId",
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
          (v3/*: any*/),
          (v4/*: any*/)
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
          },
          (v4/*: any*/),
          {
            "alias": "_deletedPostId",
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "deletedPostId"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c8bf0e8079effb36d77b169b92fc93b6",
    "id": null,
    "metadata": {},
    "name": "PostListMutation",
    "operationKind": "mutation",
    "text": "mutation PostListMutation(\n  $input: PostDeleteInput!\n) {\n  postDelete(input: $input) {\n    deletedPostId\n    _deletedPostId: deletedPostId\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '201177986dcc148b46e9237a6634b3d6';

export default node;
