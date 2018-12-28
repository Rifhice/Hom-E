const DeviceController = require('../../controllers/DeviceController')

module.exports = async (req, res, next) => {
    const device = await DeviceController.getDeviceById(req.params.deviceId)
    return device ? next() : res.status(404).send("Device not found")
}