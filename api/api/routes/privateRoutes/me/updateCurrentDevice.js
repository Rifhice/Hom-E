const UserController = require('../../../controllers/UserController')
/**
  * @swagger
  *
  * paths:
  *   /Me/CurrentDevice:
  *     put:
  *       tags:
  *         - User
  *       description: Changes the current device
  *       summary: Changes the current device
  *       responses:
  *         200:
  *           description: The device has been changed
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  */
module.exports = async (req, res) => {
    try {
        if (!req.user.devices.some(device => device.toString() === req.body.deviceId.toString()))
            return res.status(401).send("The user in question can't manage this device ! ")
        const user = await UserController.updateCurrentDevice(req.user._id, req.user.devices.find(device => device.toString() === req.body.deviceId.toString()))
        user.hash = undefined
        res.status(200).send(user)
    }
    catch (error) {
        res.status(500).send("Internal error")
    }
}