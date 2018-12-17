const ComplexCommand = require('../../controllers').ComplexCommandsController

module.exports = async req => {
    try {
        return { code: 200, data: await ComplexCommand.getComplexCommands() }
    }
    catch (error) {
        logger.error(error)
        return { code: 500, message: "Internal device error" }
    }
}