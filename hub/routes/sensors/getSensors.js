const SensorController = require('../../controllers/SensorController')

module.exports = async req => {
    try {
        return { code: 200, data: await SensorController.getSensors() }
    }
    catch (error) {
        logger.error(error)
        return { code: 500, message: "Internal device error" }
    }
}