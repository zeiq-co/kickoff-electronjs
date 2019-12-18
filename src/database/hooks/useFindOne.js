import { useEffect, useState } from 'react';
import { initDatabase } from '../rxdb';

const useFindOne = (table, findQuery) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    setLoading(true);
    const db = await initDatabase();
    // console.log('db', db[table].name);

    const doc = await db[table].findOne(findQuery).exec();
    setResult(doc);
    setLoading(false);
    return doc;
  };

  // init load
  useEffect(() => {
    execute();
  }, []);

  return [{ data: result, loading }, execute];
};

export default useFindOne;
