const mongoose = require("mongoose");

const ComplexCommandSchema = new mongoose.Schema({
    name: String,
    description: String,
    orders: [{
        actuatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Actuator' },
        executable: String,
    }],
}, { timestamps: true });

const ComplexCommand = mongoose.model("ComplexCommand", ComplexCommandSchema);

module.exports = {
    ComplexCommand
};