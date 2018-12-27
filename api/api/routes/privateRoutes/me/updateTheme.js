const UserController = require('../../../controllers/UserController')
/**
  * @swagger
  *
  * paths:
  *   /Me/Theme:
  *     put:
  *       tags:
  *         - User
  *       description: Changes the current theme
  *       summary: Changes the current theme
  *       responses:
  *         200:
  *           description: The theme has been changed
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  */
module.exports = async (req, res) => {
    try {
        const user = await UserController.updateTheme(req.user._id, req.body.theme)
        user.hash = undefined
        res.status(200).send(user)
    }
    catch (error) {
        res.status(500).send("Internal error")
    }
}