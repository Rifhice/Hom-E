const mongoose = require("mongoose");

const BehaviorSchema = new mongoose.Schema({
    evaluable: {},
    command: {},
}, { timestamps: true });

const Behavior = mongoose.model("Behavior", BehaviorSchema);

module.exports = {
    Behavior
};