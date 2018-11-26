const express = require('express');
const router = express.Router();

router.use('/cards', require('./cards'));

module.exports = router;
