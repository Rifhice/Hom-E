const SocketService = require('../../../../services/socket')
const memberRestrictions = require('../../../helper/memberRestrictions')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users/Restrictions:
  *     get:
  *       tags:
  *         - Users
  *       description: Fetches all the possible restrictions
  *       summary: Fetches all the possible restrictions
  *       responses:
  *         200:
  *           description: All the possible restriction
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  *         403:
  *           description: Unauthorized
  */
module.exports = async (req, res, next) => {
  const checkDeviceResult = (response) => {
    if (response.result === "timeout")
      return { code: 504, message: "The device response has timeout" }
    else if (response.result === "unreachable")
      return { code: 502, message: "The device is unreachable" }
    else if (response.result === "device_error")
      return { code: response.payload.code, message: response.payload.message }
    else
      return { code: 200, data: response.payload }
  }
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

  return res.status(200).send({
    general: memberRestrictions,
    actuators: actuators.data.map(actuator => { return { name: actuator.name, restriction: { target: actuator._id, entity: "actuator" } } }),
    sensors: sensors.data.map(sensor => { return { name: sensor.name, restriction: { target: sensor._id, entity: "sensor" } } })
  })
}