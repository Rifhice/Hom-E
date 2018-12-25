const router = require('../../router')

router.add("GET", "/api/device/:deviceId/EnvironmentVariables", require('./getEnvironmentVariables'))

module.exports = router