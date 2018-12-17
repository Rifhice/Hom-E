const router = require('../../router')

router.add("GET", "/api/device/:deviceId/Commands", require('./getCommands'))

module.exports = router