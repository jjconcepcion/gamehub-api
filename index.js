const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.get('/', (req, res) => res.send('gamehub-api'));

const db = config.get('db');
mongoose.connect(db).then(() => console.log(`Connected to ${db}`));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}.`));

module.exports = server;
