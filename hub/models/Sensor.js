const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    environment_variables: [{ type: mongoose.Schema.Types.ObjectId, ref: "EnvironmentVariable" }]
}, { timestamps: true });

const Sensor = mongoose.model("Sensor", SensorSchema);

module.exports = {
    Sensor
};