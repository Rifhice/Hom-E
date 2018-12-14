const express = require('express');
const router = express.Router();
const checkRequest = require('../../../middlewares/CheckRequest')
const { actuatorValidator } = require('../../../validations/privateRoutes');
const requestTransferer = require('../../../middlewares/transferRequestToDevice')


router.get('/:deviceId/actuators', actuatorValidator.getActuators, checkRequest, requestTransferer, require('./getActuators'));

module.exports = router;
