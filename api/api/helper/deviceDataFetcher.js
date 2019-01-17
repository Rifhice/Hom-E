const checkDeviceResult = require('./formatDeviceAnswer')
const SocketService = require('../../services/socket')

module.exports = {
    async getSensors(deviceId) {
        let sensors = await new Promise((resolve, reject) =>
            SocketService.emitToDevice('request', deviceId, {
                "originalUrl": `/api/Devices/${deviceId}/Sensors`,
                "method": "GET",
                "body": {},
                "params": { "deviceId": deviceId }
            }, response => resolve(response)))
        sensors = checkDeviceResult(sensors)
        if (sensors.code !== 200) {
            const error = new Error(sensors.message)
            error.code = sensors.code
            console.log(error)
            throw error
        }
        return sensors
    },
    async getActuators(deviceId) {
        let actuators = await new Promise((resolve, reject) =>
            SocketService.emitToDevice('request', deviceId, {
                "originalUrl": `/api/Devices/${deviceId}/Actuators`,
                "method": "GET",
                "body": {},
                "params": { "deviceId": deviceId }
            }, response => resolve(response)))
        actuators = checkDeviceResult(actuators)
        if (actuators.code !== 200) {
            const error = new Error(actuators.message)
            error.code = actuators.code
            console.log(error)
            throw error
        }
        return actuators
    }
}