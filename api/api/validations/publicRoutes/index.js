const { param, body } = require('express-validator/check');

module.exports = {
    registerValidator: require('./RegisterValidator'),
    loginValidator: require('./LoginValidator'),
}; 