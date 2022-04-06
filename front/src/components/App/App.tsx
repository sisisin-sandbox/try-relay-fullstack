import { graphql } from 'react-relay';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';

import type { AppQuery } from './__generated__/AppQuery.graphql';
import { Links } from '../Links';
import GQLQueryLoader, { GenerateQueryLoaderProps } from '../Loader';

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
      <Links></Links>
    </div>
  );
};

export function App() {
  return (
    <GQLQueryLoader
      variables={{ id: '1' }}
      query={operation}
      render={(queryRef: PreloadedQuery<AppQuery>, refresh) => <Content queryRef={queryRef} refresh={refresh} />}
    ></GQLQueryLoader>
  );
}
