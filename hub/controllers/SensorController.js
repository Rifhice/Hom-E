const Sensor = require("../models").Sensor;

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
        return await Sensor.findOneAndUpdate({ _id: sensorId },
            { $set: { isConnected: isConnected } }, { "new": true })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getSensors,
    updateIsConnected,
    getSensorById
};
