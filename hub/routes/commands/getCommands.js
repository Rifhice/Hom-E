const Command = require('../../controllers').CommandController

module.exports = async req => {
    try {
        return { code: 200, data: await Command.getCommands() }
    }
    catch (error) {
        logger.error(error)
        return { code: 500, message: "Internal device error" }
    }
}