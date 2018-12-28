/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Behaviors:
  *     get:
  *       tags:
  *         - Behaviors
  *       description: Fetches all the behaviors for a specific device
  *       summary: Fetches all the behaviors for a specific device
  *       responses:
  *         200:
  *           description: The list of behaviors
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Behaviors'
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
  next()
}