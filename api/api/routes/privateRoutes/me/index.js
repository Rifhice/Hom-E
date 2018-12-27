const express = require('express');
const router = express.Router({ mergeParams: true });
const meValidator = require('../../../validations/privateRoutes/me')
const checkRequest = require('../../../middlewares/CheckRequest')
const WaitingForPairingController = require('../../../controllers/WaitingForPairingController')

router.get('/Informations', require('./getInformations'));
router.put('/Language', meValidator.updateLanguage, checkRequest, require('./updateLanguage'));
router.put('/Theme', meValidator.updateTheme, checkRequest, require('./updateTheme'));
router.put('/CurrentDevice', meValidator.updateCurrentDevice, checkRequest, require('./updateCurrentDevice'));

module.exports = router;