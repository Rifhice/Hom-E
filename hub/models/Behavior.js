const mongoose = require("mongoose");

const BehaviorSchema = new mongoose.Schema({
    evaluable: {},
    command: {
        iscomplex: Boolean,
        _id: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

const Behavior = mongoose.model("Behavior", BehaviorSchema);

module.exports = {
    Behavior
};