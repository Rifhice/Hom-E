const UserController = require('../../../../controllers/UserController')
const SocketService = require('../../../../../services/socket')
const checkDeviceResult = require('../../../../helper/formatDeviceAnswer')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Favourites:
  *     post:
  *       tags:
  *         - Sensors
  *       description: Adds a favourites either a sensors or an actuators
  *       summary: Adds a favourites
  *       responses:
  *         200:
  *           description: The new favourite
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Sensors'
  *         500:
  *           description: Internal error
  *         501:
  *           description: The device does not implement this request
  *         502:
  *           description: The device is unreachable
  *         504:
  *           description: The device response has timeout
  */
module.exports = async (req, res, next) => {
  if (req.body.type === "sensor") {
    const user = await UserController.addSensorToFavourite(req.user._id, req.params.deviceId, req.body.objectId)
    let sensors = await new Promise((resolve, reject) =>
      SocketService.emitToDevice('request', req.params.deviceId, {
        "originalUrl": `/api/Devices/${req.params.deviceId}/Sensors`,
        "method": "GET",
        "body": {},
        "params": { "deviceId": req.params.deviceId }
      }, response => resolve(response)))
    sensors = checkDeviceResult(sensors)
    if (sensors.code !== 200)
      return res.status(sensors.code).send(sensors.message)
    return res.status(200).send(sensors.data.find(sensor => sensor._id === req.body.objectId))
  }
  else if (req.body.type === "actuator") {
    await UserController.addActuatorToFavourite(req.user._id, req.params.deviceId, req.body.objectId)
    let actuators = await new Promise((resolve, reject) =>
      SocketService.emitToDevice('request', req.params.deviceId, {
        "originalUrl": `/api/Devices/${req.params.deviceId}/Actuators`,
        "method": "GET",
        "body": {},
        "params": { "deviceId": req.params.deviceId }
      }, response => resolve(response)))
    actuators = checkDeviceResult(actuators)
    if (actuators.code !== 200)
      return res.status(actuators.code).send(actuators.message)
    return res.status(200).send(actuators.data.find(actuator => actuator._id === req.body.objectId))
  }
  else {
    return res.status(400).send("Type of device unknown")
  }
}