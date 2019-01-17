const memberRestrictions = require('../../../helper/memberRestrictions')
const { getSensors, getActuators } = require('../../../helper/deviceDataFetcher')
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
  const actuators = await getActuators(req.params.deviceId)
  const sensors = await getSensors(req.params.deviceId)
  return res.status(200).send({
    general: memberRestrictions,
    actuators: actuators.data.map(actuator => { return { name: actuator.name, restriction: { target: actuator._id, entity: "actuator" } } }),
    sensors: sensors.data.map(sensor => { return { name: sensor.name, restriction: { target: sensor._id, entity: "sensor" } } })
  })
}