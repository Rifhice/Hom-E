const router = require('../../router')

router.add("GET", "/api/Devices/:deviceId/EnvironmentVariables", require('./getEnvironmentVariables'))

module.exports = router