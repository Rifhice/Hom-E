const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    masterUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Device = mongoose.model("Device", DeviceSchema);

module.exports = {
    Device
};