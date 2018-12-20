const mongoose = require("mongoose");

const ActuatorSchema = new mongoose.Schema({
    actuator: {
        name: String,
        description: String,
        isConnected: Boolean,
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    },
    quick_command: {
        name: String,
        description: String,
        type: { type: String },
        key: String,
        command_argument: {}
    },
    commands: [{
        name: String,
        description: String,
        type: { type: String },
        key: String,
        command_argument: {}
    }]
}, { timestamps: true });

const Actuator = mongoose.model("Actuator", ActuatorSchema);

module.exports = {
    Actuator
};