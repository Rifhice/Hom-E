const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    key: String,
    command_argument: {}
}, { timestamps: true });

const Command = mongoose.model("Command", CommandSchema);

module.exports = {
    Command
};