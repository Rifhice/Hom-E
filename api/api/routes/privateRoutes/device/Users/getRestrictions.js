const DeviceController = require('../../../../controllers/DeviceController')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users/:userId/Restrictions:
  *     get:
  *       tags:
  *         - Users
  *       description: Fetches all the users restriction
  *       summary: Fetches all the users restriction
  *       responses:
  *         200:
  *           description: All the users restriction
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  *         403:
  *           description: Unauthorized
  */
module.exports = async (req, res, next) => {
    const users = await DeviceController.getRestrictions(req.params.deviceId, req.params.userId)
    return res.status(200).send(users)
}