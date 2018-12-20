const { param, body } = require('express-validator/check');

module.exports = [
    body("key").trim().not().isEmpty().withMessage(`MISSING_KEY_PARAMETER`),
    body('key').isString().trim().withMessage(`KEY_MUST_BE_A_STRING`),
    body("argument").trim().not().isEmpty().withMessage(`MISSING_ARGUMENT_PARAMETER`),
    body("commandId").not().isEmpty().withMessage(`MISSING_COMMANDID_PARAMETER`),
    body('commandId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMANDID_MALFORMED`),
    param("actuatorId").not().isEmpty().withMessage(`MISSING_ACTUATORID_PARAMETER`),
    param('actuatorId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`ACTUATORID_MALFORMED`),
];
