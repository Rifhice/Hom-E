const DeviceController = require('../../../../controllers/DeviceController')
const socket = require('../../../../../services/socket')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users:
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
    const device = await DeviceController.removeUser(req.params.deviceId, req.body.userId)
    if (device.users.length === 0) {
        await DeviceController.deleteDevice(req.params.deviceId)
        logger.info(`Unpairing device ${req.params.deviceId}`)
        socket.emitToDevice('unpair', req.params.deviceId, {}, () => logger.info(`Device ${req.params.deviceId} unpaired`))
    }
    return res.status(200).send(device)
}