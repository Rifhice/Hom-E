const DeviceController = require('../../../../controllers/DeviceController')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users:
  *     post:
  *       tags:
  *         - Users
  *       description: Adds the given user to the device as a member
  *       summary: Adds the given user to the device
  *       responses:
  *         200:
  *           description: The list of users
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  *         403:
  *           description: Unauthorized
  */
module.exports = async (req, res, next) => {
    let device = await DeviceController.getDeviceById(req.params.deviceId)
    if (device.users.some(user => user.user.toString() === req.body.userId.toString())) {
        return res.status(400).send("User already in device")
    }
    device = await DeviceController.addUser(req.params.deviceId, req.body.userId)
    return res.status(200).send(device)
}