const Behavior = require("../models").Behavior;

const getBehaviors = async () => {
    try {
        return await Behavior.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

module.exports = {
    getBehaviors
};
