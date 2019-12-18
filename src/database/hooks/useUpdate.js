import { useState } from 'react';

import { initDatabase } from '../rxdb';

const useUpdate = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async (table, findQuery, updateData) => {
    setLoading(true);
    const db = await initDatabase();
    // console.log('db', db[table].name);

    const updateObj = { ...updateData };
    const doc = await db[table].findOne(findQuery).exec();

    await doc.update(updateObj);
    setResult(doc);
    setLoading(false);
    return doc;
  };

  return [execute, { data: result, loading }];
};

export default useUpdate;
