const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
    sensor: {
        name: String,
        description: String,
        isConnected: Boolean,
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
    },
    environment_variables: [{
        name: String,
        description: String,
        unit: String,
        value: {}
    }]
}, { timestamps: true });

const Sensor = mongoose.model("Sensor", SensorSchema);

module.exports = {
    Sensor
};