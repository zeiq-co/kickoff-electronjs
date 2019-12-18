import localforage from 'localforage';

import config from './config';

localforage.config({
  name: config.projectKey,
  driver: localforage.INDEXEDDB,
});

if (!localforage.supports(localforage.INDEXEDDB)) {
  alert('Indexed db storage is not allowed');
}

export default localforage;
