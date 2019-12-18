import { useEffect, useState } from 'react';
import { initDatabase } from '../rxdb';

const useFindAll = (table, findQuery, sort, limit, skip) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sortBy = sort || { createdAt: -1 };
  const limitBy = limit || 100;
  const skipBy = skip || 0;

  const execute = async () => {
    setLoading(true);
    const db = await initDatabase();
    // console.log('db', db[table].name);

    const docs = await db[table]
      .find(findQuery)
      .sort(sortBy)
      .limit(limitBy)
      .skip(skipBy)
      .exec();
    setResult(docs);
    setLoading(false);
    return docs;
  };

  // init load
  useEffect(() => {
    execute();
  }, []);

  return [{ data: result, loading }, execute];
};

export default useFindAll;
