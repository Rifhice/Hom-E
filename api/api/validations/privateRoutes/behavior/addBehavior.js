const { param, body } = require('express-validator/check');

module.exports = [
    body("behavior").not().isEmpty().withMessage(`MISSING_BEHAVIOR_PARAMETER`),
    body('behavior.evaluable').not().isEmpty().withMessage(`BEHAVIOR.EVALUABLE_MISSING`),
    body('behavior.command').not().isEmpty().withMessage(`BEHAVIOR.COMMAND_MISSING`)
];
