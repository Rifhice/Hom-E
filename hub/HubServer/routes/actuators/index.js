const router = require('../../router')

router.add("GET", "/api/Devices/:deviceId/Actuators", require('./getActuators'))
router.add("POST", "/api/Devices/:deviceId/Actuators/:actuatorId/Order", require('./executeOrder'))

module.exports = router