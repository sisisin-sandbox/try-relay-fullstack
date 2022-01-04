// your-app-name/src/RelayEnvironment.js
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

async function fetchGraphql(text: string, variables: Record<string, any>) {
  const response = await fetch('http://localhost:3100/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params: any, variables: any) {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGraphql(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export const relayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
