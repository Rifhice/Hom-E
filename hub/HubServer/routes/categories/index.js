const router = require('../../router')

router.add("GET", "/api/Devices/:deviceId/Categories", require('./getCategories'))

module.exports = router