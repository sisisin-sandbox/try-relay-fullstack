import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RelayEnvironmentProvider } from 'react-relay';
import { relayEnvironment } from './RelayEnvironment';

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <React.Suspense fallback="loading...">
        <App />
      </React.Suspense>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
