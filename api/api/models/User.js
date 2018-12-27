const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    hash: String,
    language: String,
    theme: { type: String, default: 'regular' },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
    currentDevice: { type: mongoose.Schema.Types.ObjectId, ref: "Device" }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
};