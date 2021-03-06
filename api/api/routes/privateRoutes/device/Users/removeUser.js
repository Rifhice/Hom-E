const DeviceController = require('../../../../controllers/DeviceController')
const socket = require('../../../../../services/socket')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users/:userId:
  *     delete:
  *       tags:
  *         - Users
  *       description: Removes the given user to the device as a member
  *       summary: Removes the given user to the device
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
        const device = await DeviceController.removeUser(req.params.deviceId, req.params.userId)
        if (device.users.length === 0) {
            await DeviceController.deleteDevice(req.params.deviceId)
            logger.info(`Unpairing device ${req.params.deviceId}`)
            socket.emitToDevice('unpair', req.params.deviceId, {}, () => logger.info(`Device ${req.params.deviceId} unpaired`))
        }
        socket.broadcastToClients('event', req.params.deviceId, { type: "REMOVE_USER_TO_DEVICE", payload: { _id: req.params.userId } })
        return res.status(200).send(device)
    }
    catch (error) {
        logger.error(error.lineNumber)
    }
}