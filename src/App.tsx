import React from 'react';
import MainRouter from './pages/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faTemperatureHigh,
} from '@fortawesome/free-solid-svg-icons';
import { Provider as StoreProvider } from 'react-redux';
import store from './store/store';
import PageLayoutWrapper from './components/layout/PageLayoutWrapper';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({ uri: '' }),
  // link: createUploadLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),

  headers: {
    mode: 'no-cors',
  },
});

/* Add icons from Font Awesome */
library.add(
  faHome,
  faTemperatureHigh
);

const App = () => {
  /* Load themes and store in redux */
  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
              <PageLayoutWrapper>
                <MainRouter />
              </PageLayoutWrapper>
            </Router>
        </ThemeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
