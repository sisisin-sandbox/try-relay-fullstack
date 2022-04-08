// @flow

import * as React from 'react'
import { graphql } from 'react-relay';
import {type PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import GQLQueryLoader, {type GenerateQueryLoaderProps } from '../Loader';
import type { AppQuery } from './__generated__/AppQuery.graphql';

const operation = graphql`
  query AppQuery($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

type Props = GenerateQueryLoaderProps<AppQuery>;
const Content = ({ refresh, queryRef }: Props) => {
  const data = usePreloadedQuery(operation, queryRef);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data.user?.name}</p>
      </header>
    </div>
  );
};

export const App: React.AbstractComponent<{}>=()=> {
  return (
    <GQLQueryLoader
      variables={{ id: '1' }}
      query={operation}
      render={(queryRef: PreloadedQuery<AppQuery>, refresh) => <Content queryRef={queryRef} refresh={refresh} />}
    ></GQLQueryLoader>
  );
}
