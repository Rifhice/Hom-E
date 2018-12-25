const router = require('../../router')

router.add("GET", "/api/Devices/:deviceId/Commands", require('./getCommands'))

module.exports = router