const { param, body } = require('express-validator/check');

module.exports = [
    body("userId").not().isEmpty().withMessage(`MISSING_USERID_PARAMETER`),
    body('userId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`USERID_MALFORMED`)
];
