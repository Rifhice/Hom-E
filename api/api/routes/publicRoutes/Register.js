const UserController = require('../../controllers/UserController')
const passwordHelper = require('../../helper/passwordHelper')
const jwt = require('jsonwebtoken')
/**
  * @swagger
  *
  * paths:
  *   /Register:
  *     post:
  *       tags:
  *         - User
  *       description: Register a user into the database
  *       summary: Register a user into the database
  *       responses:
  *         200:
  *           description: The user's access token
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Commands'
  */
module.exports = async (req, res) => {
    const hash = await passwordHelper.passwordHelper(req.body.password)
    const user = await UserController.addUser(req.body.username, hash)
    jwt.sign({ userId: user._id }, process.env.SECRET, (err, token) => {
        res.status(201).send(token)
    })
}