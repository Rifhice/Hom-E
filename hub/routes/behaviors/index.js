const router = require('../../router')

router.add("GET", "/api/device/:deviceId/Behaviors", require('./getBehaviors'))

module.exports = router