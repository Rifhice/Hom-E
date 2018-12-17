/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/EnvironmentVariables:
  *     get:
  *       tags:
  *         - EnvironmentVariables
  *       description: Fetches all the environment variables for a specifice device
  *       summary: Fetches all the environment variables for a specifice device
  *       responses:
  *         200:
  *           description: The list of environment variables
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/EnvironmentVariables'
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