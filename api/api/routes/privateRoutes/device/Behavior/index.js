const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { behaviorValidator } = require('../../../../validations/privateRoutes');
const requestTransferer = require('../../../../middlewares/transferRequestToDevice')
const filterAndSendResponse = require('../../../../middlewares/FilterAndSendResults')

router.get('/', behaviorValidator.getBehaviors, checkRequest, requestTransferer, require('./getBehaviors'), filterAndSendResponse('actuator'));
router.post('/', behaviorValidator.addBehavior, checkRequest, requestTransferer, require('./addBehavior'));
router.delete('/:behaviorId', behaviorValidator.deleteBehavior, checkRequest, requestTransferer, require('./deleteBehavior'));

module.exports = router;
