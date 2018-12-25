const Device = require("../models").Device;

const getDevices = async () => {
    try {
        return await Device.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};
const getDeviceById = async (DeviceId) => {
    try {
        return await Device.findOne({ _id: DeviceId })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}
const addDevice = async (deviceId, masterId) => {
    try {
        let device = await Device.findOne({ _id: deviceId })
        if (device) {
            device.masterUser = masterId
        }
        else {
            device = new Device({
                _id: deviceId,
                masterUser: masterId
            })
        }
        await device.save()
        return device
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getDevices,
    getDeviceById,
    addDevice
};
