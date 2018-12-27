const UserController = require('../../../controllers/UserController')
/**
  * @swagger
  *
  * paths:
  *   /Me/Information:
  *     get:
  *       tags:
  *         - User
  *       description: Fetches all the user information
  *       summary: Fetches all the user information
  *       responses:
  *         200:
  *           description: The user's informations
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  */
module.exports = async (req, res) => {
  const user = req.user
  user.hash = undefined
  res.status(200).send(user)
}