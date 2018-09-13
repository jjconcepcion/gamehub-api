const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: 'name: not provided' });
  }
  if (!req.body.password) {
    return res.status(400).send({ error: 'password: not provided' });
  }
  return res.status(200).send();
});

module.exports = router;
