const { param, body } = require('express-validator/check');

module.exports = {
    actuatorValidator: require('./actuator'),
    commandValidator: require('./command'),
    categoryValidator: require('./category'),
    sensorValidator: require('./sensor'),
    environmentVariableValidator: require('./environmentVariable'),
    behaviorValidator: require('./behavior'),
    complexCommandValidator: require('./complexCommand'),
    deviceValidator: [
        param('deviceId').not().isEmpty().withMessage(`MISSING_DEVICE_ID_PARAMETER`),
        param('deviceId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`DEVICE_ID_MALFORMED`),
    ]
}; 