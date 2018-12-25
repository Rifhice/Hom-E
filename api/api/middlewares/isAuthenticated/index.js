let jwt = require('jsonwebtoken');
const UserController = require('../../controllers/UserController')

module.exports = (req, res, next) => {
    return next()
    if (!req.token)
        return res.status(401).send("Unauthorized")
    jwt.verify(req.token, process.env.SECRET, async (err, decoded) => {
        if (err)
            return res.status(400).send('Token is not valid');
        userId = decoded.userId;
        const user = await UserController.getUserById(userId)
        if (!user)
            return res.status(400).send("User doesn't exist");
        req.user = user
        next()
    });

}