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
  *         401:
  *           description: Register failed
  */
module.exports = async (req, res) => {
    const doesAlreadyExistsEmail = await UserController.getUserByEmail(req.body.email)
    if (doesAlreadyExistsEmail)
        return res.status(401).send("Email taken")
    const doesAlreadyExistsUsername = await UserController.getUserByUsername(req.body.username)
    if (doesAlreadyExistsUsername)
        return res.status(401).send("Username taken")
    const hash = await passwordHelper.passwordHelper(req.body.password)
    const user = await UserController.addUser({ email: req.body.email, username: req.body.username, hash, language: req.body.language })
    jwt.sign({ userId: user._id }, process.env.SECRET, (err, token) => {
        if (err)
            return res.status(500).send("Internal error")
        return res.status(201).send(token)
    })
}