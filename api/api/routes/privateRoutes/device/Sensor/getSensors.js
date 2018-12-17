/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Sensors:
  *     get:
  *       tags:
  *         - Sensors
  *       description: Fetches all the sensors for a specifice device
  *       summary: Fetches all the sensors for a specifice device
  *       responses:
  *         200:
  *           description: The list of sensors
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
module.exports = async (req, res) => {
  res.status(200).send(req.deviceResponse)
}