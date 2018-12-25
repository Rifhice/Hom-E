const mongoose = require("mongoose");

const WaitingForPairingSchema = new mongoose.Schema({
    deviceId: mongoose.Schema.Types.ObjectId,
    masterId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const WaitingForPairing = mongoose.model("WaitingForPairing", WaitingForPairingSchema);

module.exports = {
    WaitingForPairing
};