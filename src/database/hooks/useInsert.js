import { useState } from 'react';
import nanoid from 'nanoid';

import { initDatabase } from '../rxdb';

const useInsert = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async (table, data) => {
    setLoading(true);
    const db = await initDatabase();
    // console.log('db', db[table].name);
    const id = `id${nanoid(10)}`;
    const createdAt = new Date().toJSON();
    const newObj = { id, createdAt, ...data };
    // console.log('newObj', newObj);
    db[table].insert(newObj);
    setResult(newObj);
    setLoading(false);
    return newObj;
  };

  return [execute, { data: result, loading }];
};

export default useInsert;
