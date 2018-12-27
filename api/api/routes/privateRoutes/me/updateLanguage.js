const UserController = require('../../../controllers/UserController')
/**
  * @swagger
  *
  * paths:
  *   /Me/Language:
  *     put:
  *       tags:
  *         - User
  *       description: Changes the current language
  *       summary: Changes the current language
  *       responses:
  *         200:
  *           description: The language has been changed
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Actuators'
  */
module.exports = async (req, res) => {
    try {
        const user = await UserController.updateLanguage(req.user._id, req.body.language)
        user.hash = undefined
        res.status(200).send(user)
    }
    catch (error) {
        res.status(500).send("Internal error")
    }
}