const UserController = require('../../../../controllers/UserController')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Favourites/:favouriteId:
  *     delete:
  *       tags:
  *         - Sensors
  *       description: Removes a favourite from a user
  *       summary: Removes a favourite
  *       responses:
  *         200:
  *           description: The new list of favourites
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
  const user = await UserController.removeFavourite(req.user._id, req.params.deviceId, req.params.favouriteId)
  return res.status(200).send(user)
}