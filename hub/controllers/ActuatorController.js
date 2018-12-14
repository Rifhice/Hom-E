const Actuator = require("../models").Actuator;

const getActuators = async () => {
    try {
        return await Actuator.find({}).populate([{
            path: "category",
            select: ["name"]
        },
        {
            path: "quick_command"
        },
        {
            path: "commands"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

module.exports = {
    getActuators
};
