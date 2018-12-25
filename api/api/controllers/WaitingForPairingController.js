const WaitingForPairing = require("../models").WaitingForPairing;

const getWaitingForPairings = async () => {
    try {
        return await WaitingForPairing.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const findWithDeviceId = async (deviceId) => {
    try {
        return await WaitingForPairing.findOne({ deviceId: deviceId })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addWaitingForPairingDevice = async (deviceId, masterId) => {
    try {
        const waiting = new WaitingForPairing({
            deviceId,
            masterId
        })
        return await waiting.save()
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const removeWithDeviceId = async (deviceId) => {
    try {
        return await WaitingForPairing.deleteOne({ deviceId: deviceId })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}
module.exports = {
    getWaitingForPairings,
    findWithDeviceId,
    removeWithDeviceId,
    addWaitingForPairingDevice
};
