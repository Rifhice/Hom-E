const router = require('../../router')

router.add("GET", "/api/device/:deviceId/actuators", require('./getActuators'))

module.exports = router