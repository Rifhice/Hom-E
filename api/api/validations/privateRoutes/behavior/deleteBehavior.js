const { param, body } = require('express-validator/check');

module.exports = [
    param("behaviorId").not().isEmpty().withMessage(`MISSING_BEHAVIORID_PARAMETER`),
    param('behaviorId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BEHAVIORID_MALFORMED`),
];
