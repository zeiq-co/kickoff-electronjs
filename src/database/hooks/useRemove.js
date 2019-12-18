import { useState } from 'react';

import { initDatabase } from '../rxdb';

const useRemove = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async (table, findQuery) => {
    setLoading(true);
    const db = await initDatabase();
    // console.log('db', db[table].name);

    const doc = await db[table].findOne(findQuery).exec();

    await doc.remove();
    setResult({ success: true });
    setLoading(false);
    return doc;
  };

  return [execute, { data: result, loading }];
};

export default useRemove;
