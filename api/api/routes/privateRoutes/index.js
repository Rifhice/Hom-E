const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../middlewares/CheckRequest')
const { deviceValidator } = require('../../validations/privateRoutes');

router.use('/device/:deviceId', deviceValidator, checkRequest, require('./device'));

module.exports = router;
