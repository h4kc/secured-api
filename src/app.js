// src/index.js
import express from 'express';
import config from './config/config.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = config.port;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
