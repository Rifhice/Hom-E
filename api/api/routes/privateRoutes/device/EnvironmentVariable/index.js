const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { environmentVariableValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')
const filterAndSendResponse = require('../../../../middlewares/FilterAndSendResults')

router.get('/', environmentVariableValidator.getEnvironmentVariables, checkRequest, requestTransferer, require('./getEnvironmentVariables'), filterAndSendResponse('actuator'));

module.exports = router;
