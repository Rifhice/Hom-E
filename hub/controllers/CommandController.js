const Command = require("../models").Command;

const getCommands = async () => {
    try {
        return await Command.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

module.exports = {
    getCommands
};
