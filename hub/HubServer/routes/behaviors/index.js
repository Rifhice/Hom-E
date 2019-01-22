const router = require('../../router')

router.add("GET", "/api/Devices/:deviceId/Behaviors", require('./getBehaviors'))
router.add("POST", "/api/Devices/:deviceId/Behaviors", require('./addBehavior'))
router.add("DELETE", "/api/Devices/:deviceId/Behaviors/:behaviorId", require('./deleteBehavior'))

module.exports = router