const Actuator = require('../../controllers').ActuatorController

module.exports = async req => {
    try {
        return { code: 200, data: await Actuator.getActuators() }
    }
    catch (error) {
        logger.error(error)
        return { code: 500, message: "Internal device error" }
    }
}