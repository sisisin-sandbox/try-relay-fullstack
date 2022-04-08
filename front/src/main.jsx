// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay';
import { relayEnvironment } from './RelayEnvironment';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
