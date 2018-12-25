const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
    deviceId: mongoose.Schema.Types.ObjectId,
    previousState: String,
    isAccessPointOn: Boolean,
    isOnOfflineMode: Boolean,
    isPaired: Boolean
}, { timestamps: true });

const Config = mongoose.model("Config", ConfigSchema);

module.exports = {
    Config
};