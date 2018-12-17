const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { behaviorValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')

router.get('/', behaviorValidator.getBehaviors, checkRequest, requestTransferer, require('./getBehaviors'));

module.exports = router;
