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

module.exports = {
    getSensors
};
