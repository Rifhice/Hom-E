const router = require('../router')

router.use(require('./actuators'))
router.use(require('./commands'))
router.use(require('./categories'))
router.use(require('./sensors'))
router.use(require('./environmentVariables'))
router.use(require('./behaviors'))
router.use(require('./complexCommands'))

module.exports = router