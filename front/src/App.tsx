import './App.css';
import { graphql } from 'react-relay';
import { loadQuery, usePreloadedQuery } from 'react-relay/hooks';
import { relayEnvironment } from './RelayEnvironment';
import type { AppQuery } from './__generated__/AppQuery.graphql';

const operation = graphql`
  query AppQuery($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;
const preloadedQuery = loadQuery<AppQuery>(relayEnvironment, operation, {
  id: '1',
});

function App() {
  const data = usePreloadedQuery(operation, preloadedQuery);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data.user?.name}</p>
      </header>
    </div>
  );
}

export default App;
