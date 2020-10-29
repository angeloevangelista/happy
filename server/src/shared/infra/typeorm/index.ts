import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Database connection established'))
  .catch(() =>
    console.log('An error occurred while establishing database connection'),
  );
