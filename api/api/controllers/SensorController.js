const Sensor = require("../models").Sensor;

const getSensors = async () => {
    try {
        return await Sensor.find({}).populate([{
            path: "category"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};
const getSensorById = async (sensorId) => {
    try {
        return await Sensor.findOne({ _id: sensorId }).populate([{
            path: "sensor.category"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getSensors,
    getSensorById,
};
