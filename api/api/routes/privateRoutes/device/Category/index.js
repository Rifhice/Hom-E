const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { categoryValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')

router.get('/', categoryValidator.getCategories, checkRequest, requestTransferer, require('./getCategories'));

module.exports = router;
