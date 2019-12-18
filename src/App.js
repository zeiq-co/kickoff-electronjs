import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';

import theme, { GlobalStyle } from './styles/theme';
import { store, persistor } from './store';
import Navigation from './screens';
import { Loading } from './components/elements';

import './styles/styles.css';
import { initDatabase } from './database/rxdb';

// initDatabase();

function App() {
  return (
    <PersistGate loading={<Loading />} persistor={persistor}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <Navigation />
          <GlobalStyle />
        </ThemeProvider>
      </StoreProvider>
    </PersistGate>
  );
}

export default App;
