import React from 'react';
import { Provider } from 'react-redux';
import { CombinedState, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store/index';
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

interface TestProps {
  children: any;
  gqlMocks?: any;
  url: string;
  params?: any;
  isPage: boolean;
  store?: any;
}

export const createTestStore = () => {
  return createStore(rootReducer, composeWithDevTools());
};

/**
 * Provider used in testing that contains all other providers necessary to run the application.
 * Mocks the Apollo Server and Router.
 */
export const TestProvider = ({
  children,
  gqlMocks = [],
  url,
  params = {},
  isPage = true,
  store,
}: TestProps) => {
  let initEntry = url;
  for (let key of Object.keys(params)) {
    initEntry = initEntry.replace(':' + key, params[key]);
  }

  if (!store) {
    store = createTestStore();
  }

  return (
    <MockedProvider mocks={gqlMocks}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={[initEntry]}>
            {isPage && (
              <PageLayoutWrapper>
                <Route path={url}>{children}</Route>
              </PageLayoutWrapper>
            )}
            {!isPage && <Route path={url}>{children}</Route>}
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    </MockedProvider>
  );
};
