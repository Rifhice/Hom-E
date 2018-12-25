const router = require('../../router')

router.add("GET", "/api/Devices/:deviceId/Behaviors", require('./getBehaviors'))

module.exports = router