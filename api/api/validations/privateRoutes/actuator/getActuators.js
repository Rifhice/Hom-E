const { param, body } = require('express-validator/check');

module.exports = [
    param('deviceId').not().isEmpty().withMessage(`MISSING_DEVICE_ID_PARAMETER`),
    param('deviceId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`DEVICE_ID_MALFORMED`),
];
