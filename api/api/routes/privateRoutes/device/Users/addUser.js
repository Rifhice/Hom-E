const DeviceController = require('../../../../controllers/DeviceController')
const SocketService = require('../../../../../services/socket')
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
    try {
        let device = await DeviceController.getDeviceById(req.params.deviceId)
        if (device.users.some(user => user.user.toString() === req.body.userId.toString())) {
            return res.status(400).send("User already in device")
        }
        const user = await DeviceController.addUser(req.params.deviceId, req.body.userId)
        SocketService.broadcastToClients('event', req.params.deviceId, { type: "ADD_USER_TO_DEVICE", payload: user })
        SocketService.sendToUserSocket(req.body.userId.toString(), { type: 'NEW_DEVICE_PAIRED', payload: { _id: req.params.deviceId, favourites: { sensors: [], actuator: [] } } })
        return res.status(200).send(user)
    }
    catch (error) {
        return res.status(500).send('Internal error !')
    }
}