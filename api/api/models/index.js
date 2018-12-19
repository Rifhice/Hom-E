require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = {
    Sensor: require('./Sensor').Sensor,
    Actuator: require('./Actuator').Actuator,
    Category: require('./Category').Category
};