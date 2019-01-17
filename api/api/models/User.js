const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    hash: String,
    language: String,
    theme: { type: String, default: 'regular' },
    devices: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
        favourites: {
            actuators: [],
            sensors: []
        }
    }],
    currentDevice: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
        favourites: {
            actuators: [],
            sensors: []
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
};