const router = require('../../router')

router.add("GET", "/api/device/:deviceId/Actuators", require('./getActuators'))
router.add("POST", "/api/device/:deviceId/Actuators/:actuatorId/Order", require('./executeOrder'))

module.exports = router