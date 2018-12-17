const router = require('../../router')

router.add("GET", "/api/device/:deviceId/ComplexCommands", require('./getComplexCommands'))

module.exports = router