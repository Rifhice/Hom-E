const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { commandValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')

router.get('/', commandValidator.getCommands, checkRequest, requestTransferer, require('./getCommands'));

module.exports = router;
