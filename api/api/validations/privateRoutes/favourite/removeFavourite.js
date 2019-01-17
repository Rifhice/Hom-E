const { param, body } = require('express-validator/check');

module.exports = [
    param("favouriteId").not().isEmpty().withMessage(`MISSING_FAVOURITEID_PARAMETER`),
    param('favouriteId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`FAVOURITEID_MALFORMED`),
];