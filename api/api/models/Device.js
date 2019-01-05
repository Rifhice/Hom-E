const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    masterUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rank: String,
        restrictions: [{
            action: String,
            entity: String,
            target: String
        }]
    }],
}, { timestamps: true });

const Device = mongoose.model("Device", DeviceSchema);

module.exports = {
    Device
};