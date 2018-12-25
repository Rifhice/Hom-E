const Config = require("../models").Config;

const getConfig = async () => {
    try {
        const configs = await Config.find()
        return configs[0]
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const updateConfig = async (cfg) => {
    try {
        const config = await getConfig()
        if (!config) {
            const configToAdd = new Config(cfg)
            await configToAdd.save()
            return configToAdd
        }
        else {
            return Config.findOneAndUpdate({ _id: config._id },
                { $set: cfg }, { "new": true })
        }
    } catch (error) {
        logger.error(error)
    }
}

const clearConfig = async () => {
    try {
        return await Config.deleteMany()
    }
    catch (error) {
        logger.error(error)
    }
}

module.exports = {
    getConfig,
    updateConfig,
    clearConfig
};
