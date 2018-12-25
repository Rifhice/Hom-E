
const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/Register', require('./Register'));
router.use('/Login', require('./Login'));

module.exports = router;