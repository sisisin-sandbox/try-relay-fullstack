import './App.css';
import { graphql } from 'react-relay';
import { loadQuery, usePreloadedQuery } from 'react-relay/hooks';
import { relayEnvironment } from './RelayEnvironment';
import { AppQuery } from './__generated__/AppQuery.graphql';

const Q = graphql`
  query AppQuery($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;
const preloadedQuery = loadQuery<AppQuery>(relayEnvironment, Q, {
  id: '1',
});

function App() {
  const data = usePreloadedQuery(Q, preloadedQuery);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data.user?.name}</p>
      </header>
    </div>
  );
}

export default App;
