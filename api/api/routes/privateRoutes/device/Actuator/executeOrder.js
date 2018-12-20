/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Actuators/:actuatorId/Order:
  *     post:
  *       tags:
  *         - Actuators
  *       description: Send an order to the actuator given the command id, the key and the argument of the order
  *       summary: Send an order to the actuator
  *       responses:
  *         200:
  *           description: The order has been executed
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  *         500:
  *           description: Internal error
  *         501:
  *           description: The device does not implement this request
  *         502:
  *           description: The device is unreachable
  *         504:
  *           description: The device response has timeout
  */
module.exports = async (req, res) => {
    res.status(200).send(req.deviceResponse)
}