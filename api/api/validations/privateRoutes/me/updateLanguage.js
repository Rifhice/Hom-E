const { param, body } = require('express-validator/check');

module.exports = [
    body("language").trim().not().isEmpty().withMessage(`MISSING_LANGUAGE_PARAMETER`),
    body('language').isString().trim().withMessage(`LANGUAGE_MUST_BE_A_STRING`),
];
