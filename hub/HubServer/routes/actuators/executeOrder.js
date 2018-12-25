const Actuator = require('../../controllers').ActuatorController
const ActuatorServer = require('../../actuator_server')

module.exports = async req => {
    try {
        return { code: 200, data: await ActuatorServer.emitOrderToActuator(req.body.key, req.body.argument, req.params.actuatorId, req.body.commandId) }
    }
    catch (error) {
        return { code: error.code, message: error.message }
    }
}