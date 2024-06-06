// src/index.js
import express from 'express';
import config from './config/config.js';

const app = express();

app.get('/greeting', (req, res) => {
  res.sendStatus(200);
});

const port = config.port;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


export default app