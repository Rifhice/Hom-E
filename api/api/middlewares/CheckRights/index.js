const DeviceController = require('../../controllers/DeviceController')

module.exports = ({ action, entity, target }) => {
    return async (req, res, next) => {
        const user = req.user
        const device = await DeviceController.getDeviceById(req.params.deviceId)
        if (device.masterUser.toString() === user._id.toString())
            return next()
        else {
            const userInfo = device.users.filter(current => current._id.toString() === user._id.toString())
            if (userInfo.length === 0)
                return res.status(403).send("Not allowed")
            if (userInfo[0].rank === "Admin")
                return next()
            let targetId = req.params[target]
            if (userInfo[0].rights.some(right => right.action === action && right.entity === entity && right.target === targetId))
                return next()
            return res.status(403).send("Not allowed")
        }
    }
}