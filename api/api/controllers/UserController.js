const User = require("../models").User;

const getUsers = async (name) => {
    try {
        return await User.find({ username: new RegExp(`${name}.*`, "i") })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};
const getUserById = async (UserId) => {
    try {
        return await User.findOne({ _id: UserId })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username: username })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addUser = async (data) => {
    try {
        const user = new User(data)
        return await user.save()
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getInformation = async (userId) => {
    try {
        return await User.findOne({ _id: userId }).populate([{
            path: "devices"
        },
        {
            path: "currentDevice"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const updateLanguage = async (userId, data) => {
    try {
        return await User.findByIdAndUpdate({ _id: userId },
            { $set: { language: data } }, { "new": true })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}
const updateTheme = async (userId, data) => {
    try {
        return await User.findByIdAndUpdate({ _id: userId },
            { $set: { theme: data } }, { "new": true })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}
const updateCurrentDevice = async (userId, data) => {
    try {
        return await User.findByIdAndUpdate({ _id: userId },
            { $set: { currentDevice: data } }, { "new": true })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addDevice = async (userId, data) => {
    try {
        const user = await getUserById(userId)
        const doesntOwnDevices = user.devices.length === 0
        const addDevice = await User.findByIdAndUpdate({ _id: userId },
            { $push: { devices: data } }, { "new": true })
        return doesntOwnDevices ? await User.findByIdAndUpdate({ _id: userId },
            { $set: { currentDevice: data } }, { "new": true }) : addDevice
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}
const removeDevice = async (userId, deviceId) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: userId },
            { $pull: { devices: { _id: deviceId } } }, { "new": true })
        if (user.currentDevice === deviceId && user.devices.length !== 0)
            await User.findByIdAndUpdate({ _id: userId },
                { $set: { currentDevice: user.devices[Math.floor(Math.random() * user.devices.length)] } }, { "new": true })
        return user.devices.length === 0 ? await User.findByIdAndUpdate({ _id: userId },
            { $set: { currentDevice: { _id: undefined, favourites: { sensors: [], actuators: [] } } } }, { "new": true }) : user
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addSensorToFavourite = async (userId, deviceId, sensorId) => {
    try {
        const user = await getUserById(userId)
        if (user.currentDevice._id.toString() === deviceId.toString()) {
            user.currentDevice.favourites.sensors.push(sensorId)
        }
        for (let i = 0; i < user.devices.length; i++) {
            if (user.devices[i]._id.toString() === deviceId.toString()) {
                user.devices[i].favourites.sensors = user.devices[i].favourites.sensors.filter(sensor => sensor !== null)
                user.devices[i].favourites.sensors.push(sensorId)
            }
        }
        return await user.save()
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addActuatorToFavourite = async (userId, deviceId, actuatorId) => {
    try {
        const user = await getUserById(userId)
        if (user.currentDevice._id.toString() === deviceId.toString()) {
            user.currentDevice.favourites.actuators.push(actuatorId)
        }
        for (let i = 0; i < user.devices.length; i++) {
            if (user.devices[i]._id.toString() === deviceId.toString()) {
                user.devices[i].favourites.actuators = user.devices[i].favourites.actuators.filter(actuator => actuator !== null)
                user.devices[i].favourites.actuators.push(actuatorId)
            }
        }
        return await user.save()
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const removeFavourite = async (userId, deviceId, favouriteId) => {
    try {
        const user = await getUserById(userId)
        if (user.currentDevice._id.toString() === deviceId.toString()) {
            user.currentDevice.favourites.actuators = user.currentDevice.favourites.actuators.filter(actuator => actuator.toString() !== favouriteId)
            user.currentDevice.favourites.sensors = user.currentDevice.favourites.sensors.filter(sensor => sensor.toString() !== favouriteId)
        }
        for (let i = 0; i < user.devices.length; i++) {
            if (user.devices[i]._id.toString() === deviceId.toString()) {
                user.devices[i].favourites.actuators = user.devices[i].favourites.actuators.filter(actuator => actuator.toString() !== favouriteId)
                user.devices[i].favourites.sensors = user.devices[i].favourites.sensors.filter(sensor => sensor.toString() !== favouriteId)
            }
        }
        return await user.save()
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    getUserByUsername,
    getUserByEmail,
    getInformation,
    updateLanguage,
    updateTheme,
    updateCurrentDevice,
    addDevice,
    removeDevice,
    addSensorToFavourite,
    addActuatorToFavourite,
    removeFavourite
};
