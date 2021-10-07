const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(`${path.resolve()}/dist`));
app.use('/login', (req, res, next) => {
  res.sendFile(`${path.resolve()}/dist/login.html`);
});
app.use('/', (req, res, next) => {
  res.sendFile(`${path.resolve()}/dist/index.html`);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
