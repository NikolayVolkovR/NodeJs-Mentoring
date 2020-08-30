import express from 'express';
import { PORT } from './config';

const startServer = async () => {
  const app = express();

  await require('./loaders').default({ expressApp: app });
  app.listen(PORT, (err) => {
    if (err) {
      // todo logger here
      process.exit(1);
    }
    console.log(`Server started at http://localhost:${PORT}`);
  });
};

startServer();

