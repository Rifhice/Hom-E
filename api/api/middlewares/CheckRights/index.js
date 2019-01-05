const DeviceController = require('../../controllers/DeviceController')

module.exports = ({ action, entity, target }) => {
    return async (req, res, next) => {
        const user = req.user
        const device = await DeviceController.getDeviceById(req.params.deviceId)
        if (device.masterUser.toString() === user._id.toString())
            return next()
        else {
            const userInfo = device.users.filter(current => current.user && current.user.toString() === user._id.toString())
            if (userInfo.length === 0)
                return res.status(403).send("Not allowed")
            if (userInfo[0].rank === "Admin")
                return next()
            let targetId = req.params[target]
            if (userInfo[0].restrictions.length === 0)
                return next()
            console.log(userInfo[0].restrictions)
            if (userInfo[0].restrictions.some(restriction => restriction.action === action && restriction.entity === entity && (restriction.target === targetId || target === "")))
                return res.status(403).send("Not allowed")
            return next()
        }
    }
}