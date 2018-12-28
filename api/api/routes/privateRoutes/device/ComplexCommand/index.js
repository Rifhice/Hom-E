const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { complexCommandValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')
const filterAndSendResponse = require('../../../../middlewares/FilterAndSendResults')

router.get('/', complexCommandValidator.getComplexCommands, checkRequest, requestTransferer, require('./getComplexCommands'), filterAndSendResponse('actuator'));

module.exports = router;
