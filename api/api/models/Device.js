const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    masterUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rank: String,
        rights: [{
            action: String,
            entity: String,
            target: mongoose.Schema.Types.ObjectId
        }]
    }],
}, { timestamps: true });

const Device = mongoose.model("Device", DeviceSchema);

module.exports = {
    Device
};