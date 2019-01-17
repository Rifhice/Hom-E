module.exports = (response) => {
    if (response.result === "timeout")
        return { code: 504, message: "The device response has timeout" }
    else if (response.result === "unreachable")
        return { code: 502, message: "The device is unreachable" }
    else if (response.result === "device_error")
        return { code: response.payload.code, message: response.payload.message }
    else
        return { code: 200, data: response.payload }
}