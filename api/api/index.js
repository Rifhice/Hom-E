const express = require('express');
require('dotenv').config();

const router = express.Router();
const bearerToken = require('express-bearer-token')

router.use(bearerToken())

router.use(require('./routes/privateRoutes/index'));

router.all('*', (req, res) => {
  res.sendStatus(404);
  res.end();
});

module.exports = router