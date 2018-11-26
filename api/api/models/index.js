require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = {
    Card: require('./Card').Card,
    Item: require('./Card').Item,
    Checklist: require('./Card').Checklist
};