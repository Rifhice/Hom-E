const Command = require("../models").Command;
const database_event = require('../database_event')

const getCommands = async () => {
    try {
        return await Command.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const updateCommandValue = async (comandId, newValue) => {
    try {
        const updatedCommand = await Command.findOneAndUpdate({ _id: comandId },
            { $set: { 'command_argument.current': newValue } }, { "new": true })
        database_event.emit('event', { type: "UPDATE_COMMAND_VALUE", payload: { _id: updatedCommand._id, newValue } })
        return updatedCommand
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getCommands,
    updateCommandValue
};
