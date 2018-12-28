const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const checkRights = require('../../../../middlewares/CheckRights')
const filterAndSendResponse = require('../../../../middlewares/FilterAndSendResults')
const { actuatorValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')

router.get('/', actuatorValidator.getActuators, checkRequest, requestTransferer, require('./getActuators'), filterAndSendResponse('actuator'));
router.post('/:actuatorId/Order', actuatorValidator.executeOrder, checkRequest, checkRights({ action: "order", entity: "actuator", target: "actuatorId" }), requestTransferer, require('./executeOrder'));

module.exports = router;
