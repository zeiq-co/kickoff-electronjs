import { createStore } from 'easy-peasy';
import { persistStore, persistReducer } from 'redux-persist';
import localForge from '../utils/localforage';

import schema from './schema';
import config from '../utils/config';

const store = createStore(schema, {
  name: config.projectKey,
  devTools: true,
  reducerEnhancer: reducer =>
    persistReducer(
      {
        key: config.projectKey,
        storage: localForge,
      },
      reducer,
    ),
});

const persistor = persistStore(store);

export { store, persistor };
