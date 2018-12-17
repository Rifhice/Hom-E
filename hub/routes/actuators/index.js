const router = require('../../router')

router.add("GET", "/api/device/:deviceId/Actuators", require('./getActuators'))

module.exports = router