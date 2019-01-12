const DeviceController = require('../../../../controllers/DeviceController')
const SocketService = require('../../../../../services/socket')
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
            return res.status(400).send("User not in device!")
        }
        if (device.users.find(user => user.user.toString() === req.params.userId.toString()).rank === "Admin") {
            return res.status(400).send("User is admin can't be restrained!")
        }
        restriction = await DeviceController.addRestriction(req.params.deviceId, req.params.userId, req.body.restriction)
        SocketService.broadcastToClients('event', req.params.deviceId, { type: "ADD_RESTRICTION_TO_USER", payload: { userId: req.params.userId, restriction: restriction } })
        return res.status(200).send(restriction)
    }
    catch (error) {
        return res.status(500).send("Internal error !")
    }
}