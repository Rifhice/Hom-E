const { param, body } = require('express-validator/check');

module.exports = [
    param("userId").not().isEmpty().withMessage(`MISSING_USERID_PARAMETER`),
    param('userId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`USERID_MALFORMED`),
    body('newRank').isString().withMessage(`NEWRANK_MUST_BE_A_STRING`)
];
