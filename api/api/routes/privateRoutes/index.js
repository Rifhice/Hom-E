const express = require('express');
const router = express.Router({ mergeParams: true });
const isAuthenticated = require('../../middlewares/isAuthenticated')
const checkRequest = require('../../middlewares/CheckRequest')
const deviceExist = require('../../middlewares/DeviceExist')
const { deviceValidator } = require('../../validations/privateRoutes');

router.get('/Devices', async (req, res) => {
    const devices = await require('../../controllers/DeviceController').getDevices()
    res.send(devices)
})
router.get('/Users', async (req, res) => {
    const users = await require('../../controllers/UserController').getUsers(req.query.username)
    res.send(users.map(user => { user.hash = undefined; return user }))
})
router.use('/Devices/:deviceId', isAuthenticated, deviceValidator, checkRequest, deviceExist, require('./device'));
router.use('/WaitingForPairing', isAuthenticated, require('./waitingForPairing'));
router.use('/Me', isAuthenticated, require('./me'));

module.exports = router;
