const router = require('../../router')

router.add("GET", "/api/Devices/:deviceId/ComplexCommands", require('./getComplexCommands'))

module.exports = router