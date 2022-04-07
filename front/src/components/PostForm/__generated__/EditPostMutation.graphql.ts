/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PostEditInput = {
    body?: string | null | undefined;
    id: string;
    title?: string | null | undefined;
};
export type EditPostMutationVariables = {
    input: PostEditInput;
    connections: Array<string>;
};
export type EditPostMutationResponse = {
    readonly postEdit: {
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
};
export type EditPostMutation = {
    readonly response: EditPostMutationResponse;
    readonly variables: EditPostMutationVariables;
};



/*
mutation EditPostMutation(
  $input: PostEditInput!
) {
  postEdit(input: $input) {
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditPostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "PostEditPayload",
        "kind": "LinkedField",
        "name": "postEdit",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/)
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
    "name": "EditPostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "PostEditPayload",
        "kind": "LinkedField",
        "name": "postEdit",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
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
      }
    ]
  },
  "params": {
    "cacheID": "9b30270d0cd380179145dc43d45e1a70",
    "id": null,
    "metadata": {},
    "name": "EditPostMutation",
    "operationKind": "mutation",
    "text": "mutation EditPostMutation(\n  $input: PostEditInput!\n) {\n  postEdit(input: $input) {\n    post {\n      id\n      postId\n      userId\n      title\n      body\n    }\n    postEdge {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '608fbeec46b3324d4e1325665da12141';
export default node;
