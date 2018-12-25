const EnvironmentVariable = require('../../controllers').EnvironmentVariableController

module.exports = async req => {
    try {
        return { code: 200, data: await EnvironmentVariable.getEnvironmentVariables() }
    }
    catch (error) {
        logger.error(error)
        return { code: 500, message: "Internal device error" }
    }
}