const Actuator = require("../models").Actuator;

const getActuators = async () => {
    try {
        return await Actuator.find({}).populate([{
            path: "actuator.category"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};
const getActuatorById = async (ActuatorId) => {
    try {
        return await Actuator.findOne({ _id: ActuatorId }).populate([{
            path: "actuator.category"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getActuators,
    getActuatorById,
};
