/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Behaviors:
  *     post:
  *       tags:
  *         - Behaviors
  *       description: Creates a new behavior
  *       summary: Creates a new behavior
  *       responses:
  *         200:
  *           description: The behavior
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
    console.log(req.dataToSend)
    res.status(200).send(req.dataToSend)
}