const EnvironmentVariable = require("../models").EnvironmentVariable;

const getEnvironmentVariables = async () => {
    try {
        return await EnvironmentVariable.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

module.exports = {
    getEnvironmentVariables
};
