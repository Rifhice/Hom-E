const mongoose = require("mongoose");

const EnvironmentVariableSchema = new mongoose.Schema({
    name: String,
    description: String,
    unit: String,
    behaviors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Behavior' }],
    value: {
        value_type: String,
        current: mongoose.Schema.Types.Mixed
    }
}, { timestamps: true });

const EnvironmentVariable = mongoose.model("EnvironmentVariable", EnvironmentVariableSchema);

module.exports = {
    EnvironmentVariable
};