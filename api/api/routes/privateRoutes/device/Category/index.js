const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { categoryValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')
const filterAndSendResponse = require('../../../../middlewares/FilterAndSendResults')

router.get('/', categoryValidator.getCategories, checkRequest, requestTransferer, require('./getCategories'), filterAndSendResponse('actuator'));

module.exports = router;
