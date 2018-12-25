const express = require('express');
const router = express.Router({ mergeParams: true });
const isAuthenticated = require('../../middlewares/isAuthenticated')
const checkRequest = require('../../middlewares/CheckRequest')
const { deviceValidator } = require('../../validations/privateRoutes');

router.get('/Devices', async (req, res) => {
    const devices = await require('../../controllers/DeviceController').getDevices()
    res.send(devices)
})
router.use('/Devices/:deviceId', isAuthenticated, deviceValidator, checkRequest, require('./device'));
router.use('/WaitingForPairing', isAuthenticated, require('./waitingForPairing'));

module.exports = router;
