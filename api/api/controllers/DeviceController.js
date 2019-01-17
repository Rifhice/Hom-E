const Device = require("../models").Device;
const mongoose = require('mongoose');
const UserController = require('./UserController')
const memberRestrictions = require('../helper/memberRestrictions')
const ActuatorController = require('./ActuatorController')
const SensorController = require('./SensorController')

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
                restrictions: []
            })
        }
        else {
            device = new Device({
                _id: deviceId,
                masterUser: masterId,
                users: [{
                    user: masterId,
                    rank: "Admin",
                    restrictions: []
                }]
            })
        }
        await device.save()
        await UserController.addDevice(masterId, { _id: deviceId, favourites: { actuators: {}, sensors: {} } })
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
            },
            {
                path: 'users.restrictions'
            },
            {
                path: 'masterUser',
                select: ['email', 'username']
            }
        ])
        return { masterUser: device.masterUser, users: device.users }
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}
const getRestrictions = async () => {
    try {
        const device = await Device.findOne({ _id: DeviceId })
        const user = device.users.find(user => user.user.toString() === userId.toString())
        return user.restrictions
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addUser = async (deviceId, userId) => {
    try {
        const user = {
            user: userId,
            rank: "Member",
            restrictions: memberRestrictions
        }
        const userData = await UserController.getUserById(userId)
        await Device.findByIdAndUpdate({ _id: deviceId },
            {
                $push: {
                    users: user
                }
            }, { "new": true })
        await UserController.addDevice(userId, { _id: deviceId, favourites: { actuators: {}, sensors: {} } })
        return { ...user, user: userData }
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

const addRestriction = async (deviceId, userId, restriction) => {
    try {
        restriction._id = mongoose.Types.ObjectId()
        const newDevice = await Device.findById({ _id: deviceId })
        for (const user of newDevice.users) {
            if (user.user && user.user.toString() === userId.toString() && user.rank !== 'Admin') {
                user.restrictions.push(restriction)
            }
        }
        await newDevice.save()
        return restriction
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const removeRestriction = async (deviceId, userId, restrictionId) => {
    try {
        const newDevice = await Device.findById({ _id: deviceId })
        newDevice.users.forEach(user => {
            if (user.user && user.user.toString() === userId.toString()) {
                user.restrictions.forEach((restriction, i) => {
                    if (restriction._id.toString() === restrictionId.toString())
                        user.restrictions.splice(i, 1)
                })
            }
        })
        await newDevice.save()
        return newDevice
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const elevateUser = async (deviceId, userId) => {
    try {
        const newDevice = await Device.findById({ _id: deviceId }).populate([
            {
                path: 'users.user',
                select: ['email', 'username']
            }
        ])
        let newUser;
        newDevice.users.forEach(user => {
            if (user.user && user.user._id.toString() === userId.toString()) {
                user.rank = 'Admin'
                user.restrictions = []
                newUser = user
            }
        })
        await newDevice.save()
        return newUser
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const relegateUser = async (deviceId, userId) => {
    try {
        const newDevice = await Device.findById({ _id: deviceId }).populate([
            {
                path: 'users.user',
                select: ['email', 'username']
            }
        ])
        let newUser;
        newDevice.users.forEach(user => {
            if (user.user && user.user._id.toString() === userId.toString()) {
                user.rank = 'Member'
                user.restrictions = memberRestrictions
                newUser = user
            }
        })
        await newDevice.save()
        return newUser
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
    deleteDevice,
    addRestriction,
    removeRestriction,
    elevateUser,
    relegateUser,
    getRestrictions
};
