/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Behaviors/:behaviorId:
  *     delete:
  *       tags:
  *         - Behaviors
  *       description: Deletes a behavior with ID
  *       summary: Deletes a behavior with ID
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
    res.status(200).send(req.dataToSend)
}