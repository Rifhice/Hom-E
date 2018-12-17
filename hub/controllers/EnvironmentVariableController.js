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

const updateEnvironmentValue = async (environmentVariableId, newValue) => {
    try {
        return await EnvironmentVariable.findOneAndUpdate({ _id: environmentVariableId },
            { $set: { 'value.current': newValue } }, { "new": true })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getEnvironmentVariables,
    updateEnvironmentValue
};
