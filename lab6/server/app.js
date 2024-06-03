const express = require('express');

const routes = require('./routes/index')

const app = express();

const host = 'localhost';
const port = 8000;

app.use(express.json());

app.use('/api', routes);

app.listen(port, host, () => {
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});