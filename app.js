const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { data } = require('./data/portfolio-data.json');
const { projects } = data;

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Portfolio site listening on port ${port}!`));