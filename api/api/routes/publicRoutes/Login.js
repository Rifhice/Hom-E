const UserController = require('../../controllers/UserController')
const passwordHelper = require('../../helper/passwordHelper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
/**
  * @swagger
  *
  * paths:
  *   /Login:
  *     post:
  *       tags:
  *         - User
  *       description: Tries to login the user
  *       summary: Tries to login the user
  *       responses:
  *         200:
  *           description: The user's access token
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Commands'
  *         401:
  *           description: Login failed
  */
module.exports = async (req, res) => {
    const user = await UserController.getUserByUsername(req.body.username)
    if (user)
        return bcrypt.compare(req.body.password, user.hash, (err, isValid) => {
            if (isValid)
                return jwt.sign({ userId: user._id }, process.env.SECRET, (err, token) => {
                    res.status(201).send(token)
                })
            return res.status(401).send("Login failed")
        })
    res.status(401).send("Login failed")
}