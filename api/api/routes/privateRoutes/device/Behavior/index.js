const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { behaviorValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')
const filterAndSendResponse = require('../../../../middlewares/FilterAndSendResults')

router.get('/', behaviorValidator.getBehaviors, checkRequest, requestTransferer, require('./getBehaviors'), filterAndSendResponse('actuator'));

module.exports = router;
