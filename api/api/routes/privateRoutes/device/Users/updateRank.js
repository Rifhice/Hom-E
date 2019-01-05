const DeviceController = require('../../../../controllers/DeviceController')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users/:userId/Rank:
  *     put:
  *       tags:
  *         - Users
  *       description: Updates the rank of a user.
  *       summary: Updates the rank of a user.
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

        if (req.body.newRank === "Admin") {
            device = await DeviceController.elevateUser(req.params.deviceId, req.params.userId)
        }
        else if (req.body.newRank === "Member") {
            if (device.masterUser.toString() === req.params.userId.toString()) {
                return res.status(400).send("Cannot relegate owner of device")
            }
            device = await DeviceController.relegateUser(req.params.deviceId, req.params.userId)
        }
        else {
            return res.status(400).send("Rank unknown")
        }
        return res.status(200).send(device)
    }
    catch (error) {
        return res.status(500).send("Internal error !")
    }
}