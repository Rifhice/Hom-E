const Device = require("../models").Device;
const UserController = require('./UserController')

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
            device.users.push({
                user: masterId,
                rank: "Admin",
                rights: []
            })
        }
        else {
            device = new Device({
                _id: deviceId,
                masterUser: masterId,
                users: [{
                    user: masterId,
                    rank: "Admin",
                    rights: []
                }]
            })
        }
        await device.save()
        await UserController.addDevice(masterId, deviceId)
        return device
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getUsers = async (DeviceId) => {
    try {
        const device = await Device.findOne({ _id: DeviceId }, 'users.rank users.users').populate([
            {
                path: 'users.user',
                select: ['email', 'username']
            }
        ])
        return device.users
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addUser = async (deviceId, userId) => {
    try {
        const newDevice = await Device.findByIdAndUpdate({ _id: deviceId },
            {
                $push: {
                    users: {
                        user: userId,
                        rank: "Member",
                        rights: []
                    }
                }
            }, { "new": true })
        await UserController.addDevice(userId, deviceId)
        return newDevice
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}
const removeUser = async (deviceId, userId) => {
    try {
        const newDevice = await Device.findByIdAndUpdate({ _id: deviceId },
            { $pull: { users: { user: userId } } }, { "new": true })
        await UserController.removeDevice(userId, deviceId)
        return newDevice
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const deleteDevice = async (deviceId) => {
    try {
        return await Device.findByIdAndDelete({ _id: deviceId })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getDevices,
    getDeviceById,
    addDevice,
    getUsers,
    addUser,
    removeUser,
    deleteDevice
};
