require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = {
    Actuator: require('./Actuator').Actuator,
    Command: require('./Command').Command,
    Category: require('./Category').Category,
    Sensor: require('./Sensor').Sensor,
    EnvironmentVariable: require('./EnvironmentVariable').EnvironmentVariable,
    Behavior: require('./Behavior').Behavior,
    ComplexCommand: require('./ComplexCommand').ComplexCommand,
    Config: require('./Config').Config
};
