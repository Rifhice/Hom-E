const { param, body } = require('express-validator/check');

module.exports = [
    param("userId").not().isEmpty().withMessage(`MISSING_USERID_PARAMETER`),
    param('userId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`USERID_MALFORMED`),
    body("restriction").not().isEmpty().withMessage(`MISSING_RESTRICTION_PARAMETER`),
    body('restriction.action').isString().withMessage(`RESTRICTION.ACTION_MUST_BE_A_STRING`),
    body('restriction.entity').isString().withMessage(`RESTRICTION.ENTITY_MUST_BE_A_STRING`),
    body('restriction.target').not().isEmpty().matches(/^[0-9a-fA-F]{24}$/).withMessage(`RESTRICTION.TARGET_MALFORMED`),
];