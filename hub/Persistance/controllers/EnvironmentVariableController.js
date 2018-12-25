const EnvironmentVariable = require("../models").EnvironmentVariable;
const database_event = require('../database_event')

const getEnvironmentVariables = async () => {
    try {
        return await EnvironmentVariable.find({}).populate([{
            path: "behaviors"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const getEnvironmentVariableById = async (_id) => {
    try {
        return await EnvironmentVariable.findOne({ _id }).populate([{
            path: "behaviors"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const addBehavior = async (_id, behaviorId) => {
    try {
        const updatedEnvironmenVariable = await EnvironmentVariable.findOneAndUpdate({ _id },
            { $push: { behaviors: behaviorId } }, { "new": true })
        database_event.emit('event', { type: "UPDATE_ENVIRONMENT_VARIABLE_ADD_BEHAVIOR", payload: { _id: updatedEnvironmenVariable._id, behaviorId } })
        return updatedEnvironmenVariable
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const removeBehavior = async (_id, behaviorId) => {
    try {
        const updatedEnvironmenVariable = await EnvironmentVariable.findOneAndUpdate({ _id },
            { $pull: { behaviors: behaviorId } }, { "new": true })
        database_event.emit('event', { type: "UPDATE_ENVIRONMENT_VARIABLE_REMOVE_BEHAVIOR", payload: { _id: updatedEnvironmenVariable._id, behaviorId } })
        return updatedEnvironmenVariable
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
    updateEnvironmentValue,
    getEnvironmentVariableById,
    addBehavior,
    removeBehavior
};
