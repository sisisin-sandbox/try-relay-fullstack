/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PostQueryVariables = {|
  id: string
|};
export type PostQueryResponse = {|
  +postById: ?{|
    +id: string,
    +postId: string,
    +userId: string,
    +title: string,
    +body: string,
  |}
|};
export type PostQuery = {|
  variables: PostQueryVariables,
  response: PostQueryResponse,
|};
*/


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
// prettier-ignore
(node/*: any*/).hash = 'b8ef9f09739ce7eb19f6474837060f12';

export default node;
