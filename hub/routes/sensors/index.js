const router = require('../../router')

router.add("GET", "/api/device/:deviceId/Sensors", require('./getSensors'))

module.exports = router