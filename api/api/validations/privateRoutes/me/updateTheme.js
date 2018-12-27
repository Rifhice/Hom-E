const { param, body } = require('express-validator/check');

module.exports = [
    body("theme").trim().not().isEmpty().withMessage(`MISSING_THEME_PARAMETER`),
    body('theme').isString().trim().withMessage(`THEME_MUST_BE_A_STRING`),
];
