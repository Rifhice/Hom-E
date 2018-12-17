const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { complexCommandValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')

router.get('/', complexCommandValidator.getComplexCommands, checkRequest, requestTransferer, require('./getComplexCommands'));

module.exports = router;
