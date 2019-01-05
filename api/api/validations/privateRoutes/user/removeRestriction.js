const { param, body } = require('express-validator/check');

module.exports = [
    param("userId").not().isEmpty().withMessage(`MISSING_USERID_PARAMETER`),
    param('userId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`USERID_MALFORMED`),
    param("restrictionId").not().isEmpty().withMessage(`MISSING_RESTRICTIONID_PARAMETER`),
    param('restrictionId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`RESTRICTIONID_MALFORMED`),
];