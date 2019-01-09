const UserController = require('../../controllers/UserController')
const DeviceController = require('../../controllers/DeviceController')

module.exports = (entity) => {
    return async (req, res, next) => {
        const data = req.dataToSend
        const user = req.user
        const device = await DeviceController.getDeviceById(req.params.deviceId)
        if (device.masterUser.toString() === user._id.toString())
            return res.status(200).send(data)
        else {
            const userInfo = device.users.filter(current => current.user.toString() === user._id.toString())
            console.log(userInfo.length)
            if (userInfo.length === 0)
                return res.status(403).send("Not allowed")
            const filtered = data.filter(currentData => !userInfo[0].restrictions.some(currentRestriction => currentRestriction.target === currentData._id && currentRestriction.entity === entity))
            return res.status(200).send(filtered)
        }
    }
}