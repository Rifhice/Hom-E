const { param, body } = require('express-validator/check');

module.exports = [
    body("deviceId").not().isEmpty().withMessage(`MISSING_DEVICEID_PARAMETER`),
    body('deviceId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`DEVICEID_MALFORMED`),
];
