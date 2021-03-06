const socket = require('../../../services/socket')
const checkDeviceResult = require('../../helper/formatDeviceAnswer')

module.exports = async (req, res, next) => {
    const deviceId = req.params.deviceId
    let result = await new Promise((resolve, reject) =>
        socket.emitToDevice('request', deviceId, {
            originalUrl: req.originalUrl,
            method: req.method,
            body: req.body,
            params: req.params
        }, response => resolve(response)))
    result = checkDeviceResult(result)
    if (result.code !== 200)
        return res.status(result.code).send(result.message)
    req.dataToSend = result.data
    next()
}