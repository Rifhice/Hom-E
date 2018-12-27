const { param, body } = require('express-validator/check');

module.exports = [
    body("email").optional().trim().not().isEmpty().withMessage(`MISSING_EMAIL_PARAMETER`),
    body('email').optional().isString().trim().withMessage(`EMAIL_MUST_BE_A_STRING`),
    //body('email').optional().matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).withMessage(`EMAIL_MALFORMED`),
    body("username").optional().trim().not().isEmpty().withMessage(`MISSING_USERNAME_PARAMETER`),
    body('username').optional().isString().trim().withMessage(`USERNAME_MUST_BE_A_STRING`),
    body("password").trim().not().isEmpty().withMessage(`MISSING_PASSWORD_PARAMETER`),
    body('password').isString().trim().withMessage(`PASSWORD_MUST_BE_A_STRING`),
    //body('password').matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/).withMessage(`PASSWORD_MALFORMED`),
];
