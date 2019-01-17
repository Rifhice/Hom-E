const { param, body } = require('express-validator/check');

module.exports = [
    body("type").not().isEmpty().withMessage(`MISSING_TYPE_PARAMETER`),
    body("objectId").not().isEmpty().withMessage(`MISSING_FAVOURITE_PARAMETER`),
    body('objectId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`FAVOURITEID_MALFORMED`),
];