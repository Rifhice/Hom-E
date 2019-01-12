const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { sensorValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')
const filterAndSendResponse = require('../../../../middlewares/FilterAndSendResults')

router.get('/', sensorValidator.getSensors, checkRequest, requestTransferer, require('./getSensors'), filterAndSendResponse('sensor'));

module.exports = router;
