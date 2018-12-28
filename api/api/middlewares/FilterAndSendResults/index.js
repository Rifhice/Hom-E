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
            const userInfo = device.users.filter(current => current._id.toString() === user._id.toString())
            if (userInfo.length === 0)
                return res.status(403).send("Not allowed")
            const filtered = data.filter(currentData => userInfo[0].rights.some(currentRight => currentRight.target === currentData._id && currentRight.entity === entity))
            return res.status(200).send(filtered)
        }
    }
}