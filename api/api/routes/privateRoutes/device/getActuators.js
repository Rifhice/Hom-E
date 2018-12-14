/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/actuators:
  *     get:
  *       tags:
  *         - Actuators
  *       description: Fetches all the actuators for a specifice device
  *       summary: Fetches all the actuators for a specifice device
  *       responses:
  *         200:
  *           description: The list of actuators
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