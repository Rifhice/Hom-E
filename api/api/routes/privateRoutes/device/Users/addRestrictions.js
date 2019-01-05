const DeviceController = require('../../../../controllers/DeviceController')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users/:userId/Restrictions:
  *     post:
  *       tags:
  *         - Users
  *       description: Adds the given user a restriction.
  *       summary: Adds the given user a restriction.
  *       responses:
  *         200:
  *           description: The updated user
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  *         403:
  *           description: Unauthorized
  */
module.exports = async (req, res, next) => {
    try {
        let device = await DeviceController.getDeviceById(req.params.deviceId)
        if (!device.users.some(user => user.user.toString() === req.params.userId.toString())) {
            return res.status(400).send("User not in device")
        }
        device = await DeviceController.addRestriction(req.params.deviceId, req.params.userId, req.body.restriction)
        return res.status(200).send(device)
    }
    catch (error) {
        return res.status(500).send("Internal error !")
    }
}