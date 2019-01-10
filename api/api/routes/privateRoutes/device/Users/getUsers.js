const DeviceController = require('../../../../controllers/DeviceController')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users:
  *     get:
  *       tags:
  *         - Users
  *       description: Fetches all the users of this device
  *       summary: Fetches all the users of this device
  *       responses:
  *         200:
  *           description: The devices users
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  *         403:
  *           description: Unauthorized
  */
module.exports = async (req, res, next) => {
    const device = await DeviceController.getDeviceById(req.params.deviceId)
    if (device.users.some(user => user.user.toString() === req.user._id.toString())) {
        const users = await DeviceController.getUsers(req.params.deviceId)
        return res.status(200).send(users)
    }
    return res.status(403).send("Unauthorized")
}