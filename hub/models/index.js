require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = {
    Actuator: require('./Actuator').Actuator,
    Command: require('./Command').Command,
    Category: require('./Category').Category
};