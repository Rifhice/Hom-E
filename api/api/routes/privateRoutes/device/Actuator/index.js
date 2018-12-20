const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { actuatorValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')

router.get('/', actuatorValidator.getActuators, checkRequest, requestTransferer, require('./getActuators'));
router.post('/:actuatorId/Order', actuatorValidator.executeOrder, checkRequest, requestTransferer, require('./executeOrder'));

module.exports = router;
