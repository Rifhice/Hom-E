const EnvironmentVariable = require("../models").EnvironmentVariable;
const database_event = require('../database_event')

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
        const updatedEnvironmenVariable = await EnvironmentVariable.findOneAndUpdate({ _id: environmentVariableId },
            { $set: { 'value.current': newValue } }, { "new": true })
        database_event.emit('event', { type: "UPDATE_ENVIRONMENT_VARIABLE_VALUE", payload: { _id: updatedEnvironmenVariable._id, newValue } })
        return updatedEnvironmenVariable
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
