const ComplexCommand = require("../models").ComplexCommand;

const getComplexCommands = async () => {
    try {
        return await ComplexCommand.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};


module.exports = {
    getComplexCommands
};
