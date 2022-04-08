/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditPostQueryVariables = {|
  id: string
|};
export type EditPostQueryResponse = {|
  +postById: ?{|
    +id: string,
    +postId: string,
    +userId: string,
    +title: string,
    +body: string,
  |}
|};
export type EditPostQuery = {|
  variables: EditPostQueryVariables,
  response: EditPostQueryResponse,
|};
*/


/*
query EditPostQuery(
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

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "EditPostQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditPostQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f6ec7fe3400dd6ac9007b0cc281e3120",
    "id": null,
    "metadata": {},
    "name": "EditPostQuery",
    "operationKind": "query",
    "text": "query EditPostQuery(\n  $id: ID!\n) {\n  postById(id: $id) {\n    id\n    postId\n    userId\n    title\n    body\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c13fcf82fcff2836952f2d20c94d9fee';

export default node;
