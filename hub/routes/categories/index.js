const router = require('../../router')

router.add("GET", "/api/device/:deviceId/Categories", require('./getCategories'))

module.exports = router