const DeviceController = require('../../../../controllers/DeviceController')
/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Users/Restrictions:
  *     get:
  *       tags:
  *         - Users
  *       description: Fetches all the possible restrictions
  *       summary: Fetches all the possible restrictions
  *       responses:
  *         200:
  *           description: All the possible restriction
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  *         403:
  *           description: Unauthorized
  */
module.exports = async (req, res, next) => {
    const users = await DeviceController.getAllRestrictions(req.params.deviceId)
    return res.status(200).send(users)
}