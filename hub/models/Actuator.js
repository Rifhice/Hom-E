const mongoose = require("mongoose");

const ActuatorSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    quick_command: { type: mongoose.Schema.Types.ObjectId, ref: "Command" },
    commands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Command" }]
}, { timestamps: true });

const Actuator = mongoose.model("Actuator", ActuatorSchema);

module.exports = {
    Actuator
};