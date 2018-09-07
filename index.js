const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => res.send('gamehub-api'));

const db = 'mongodb://localhost/gamehub-api';
mongoose.connect(db).then(() => console.log(`Connected to ${db}`));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}.`));

module.exports = server;
