const Sensor = require("../models").Sensor;
const EnvironmentVariable = require("../models").EnvironmentVariable;
const database_event = require('../database_event')

const getSensors = async () => {
    try {
        return await Sensor.find({}).populate([{
            path: "category",
            select: ["name"]
        },
        {
            path: "environment_variables"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const registerSensor = async (sensor, env_var) => {
    try {
        let variables = env_var.map(current => new EnvironmentVariable(current))
        sensor.environment_variables = variables
        const sensor_to_add = new Sensor(sensor)
        await Promise.all([EnvironmentVariable.insertMany(variables), Sensor.insertMany([sensor_to_add])])
        database_event.emit('event', { type: "REGISTERED_SENSOR", payload: { sensor: sensor_to_add } })
        return sensor_to_add
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getSensorById = async (sensorId) => {
    try {
        return await Sensor.find({ _id: sensorId }).populate([{
            path: "category",
            select: ["name"]
        },
        {
            path: "environment_variables"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const updateIsConnected = async (sensorId, isConnected) => {
    try {
        const updatedSensor = await Sensor.findOneAndUpdate({ _id: sensorId },
            { $set: { isConnected: isConnected } }, { "new": true })
        database_event.emit('event', { type: "UPDATE_SENSOR_ISCONNECTED", payload: { _id: updatedSensor._id, isConnected } })
        return updatedSensor
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getSensors,
    updateIsConnected,
    getSensorById,
    registerSensor
};
