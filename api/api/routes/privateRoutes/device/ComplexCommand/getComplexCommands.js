/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/ComplexCommands:
  *     get:
  *       tags:
  *         - ComplexCommands
  *       description: Fetches all the complex commands for a specifice device
  *       summary: Fetches all the complex commands for a specifice device
  *       responses:
  *         200:
  *           description: The list of complex commands
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/ComplexCommands'
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