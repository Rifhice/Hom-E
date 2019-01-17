const UserController = require('../../../../controllers/UserController')
const { getSensors, getActuators } = require('../../../../helper/deviceDataFetcher')
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
  try {
    if (req.body.type === "sensor") {
      await UserController.addSensorToFavourite(req.user._id, req.params.deviceId, req.body.objectId)
      const sensors = await getSensors(req.params.deviceId)
      return res.status(200).send(sensors.data.find(sensor => sensor._id === req.body.objectId))
    }
    else if (req.body.type === "actuator") {
      await UserController.addActuatorToFavourite(req.user._id, req.params.deviceId, req.body.objectId)
      const actuators = await getActuators(req.params.deviceId)
      return res.status(200).send(actuators.data.find(actuator => actuator._id === req.body.objectId))
    }
    else {
      return res.status(400).send("Type of device unknown")
    }
  }
  catch (error) {
    return res.status(error.code).send(error.message)
  }
}