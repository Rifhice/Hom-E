const router = require('../../router')

router.add("GET", "/api/Devices/:deviceId/Sensors", require('./getSensors'))

module.exports = router