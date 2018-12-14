const socket = require('../../../services/socket')

const checkDeviceResult = (response) => {
    console.log(response)
    if (response.result === "timeout")
        return { code: 504, message: "The device response has timeout" }
    else if (response.result === "unreachable")
        return { code: 502, message: "The device is unreachable" }
    else if (response.result === "device_error")
        return { code: response.payload.code, message: response.payload.message }
    else
        return { code: 200, data: response.payload }
}

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
    req.deviceResponse = result.data
    next()
}