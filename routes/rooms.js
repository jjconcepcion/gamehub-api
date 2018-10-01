const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.use('/', auth, (req, res) => {
  res.send();
});

module.exports = router;
