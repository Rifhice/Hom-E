const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/Actuators', require('./Actuator'));
router.use('/Commands', require('./Command'));
router.use('/Categories', require('./Category'));
router.use('/Sensors', require('./Sensor'));
router.use('/EnvironmentVariables', require('./EnvironmentVariable'));
router.use('/Behaviors', require('./Behavior'));
router.use('/ComplexCommands', require('./ComplexCommand'));
router.use('/Users', require('./Users'));

module.exports = router;

