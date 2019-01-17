const { getSensors, getActuators } = require('../../../../helper/deviceDataFetcher')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Favourites:
  *     get:
  *       tags:
  *         - Sensors
  *       description: Fetches all the favourites sensors and actuators of the user
  *       summary: Fetches all the favourites
  *       responses:
  *         200:
  *           description: The list of sensors and actuators
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
  try {
    const userDevices = req.user.devices
    let device = userDevices.filter(device => device._id.toString() === req.params.deviceId.toString())
    if (device.length === 0)
      return res.status(400).send("The user is not is this device")
    device = device[0]
    const actuators = await getActuators(req.params.deviceId)
    const sensors = await getSensors(req.params.deviceId)
    device.favourites.actuators = device.favourites.actuators.map(actuator => actuator !== null ? actuators.data.find(act => act._id.toString() === actuator.toString()) : undefined)
    device.favourites.sensors = device.favourites.sensors.map(sensor => sensor !== null ? sensors.data.find(sen => sen._id.toString() === sensor.toString()) : undefined)
    return res.status(200).send(device.favourites)
  }
  catch (error) {
    return res.status(error.code).send(error.message)
  }
}