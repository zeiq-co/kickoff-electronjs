/* eslint import/prefer-default-export: 0 */

import RxDB from 'rxdb';

import config from '../utils/config';
import itemSchema from './schema/item';

RxDB.plugin(require('pouchdb-adapter-idb'));

// to clear database
// RxDB.removeDatabase('config.dbName', 'idb');

const initDatabase = async () => {
  // console.log('active db', dbName);

  const db = await RxDB.create({
    name: config.dbName,
    adapter: 'idb',
    ignoreDuplicate: true,
  });

  await db.collection({ name: 'item', schema: itemSchema });

  // console.log('rxdb', db);
  return db;
};

export { initDatabase };
