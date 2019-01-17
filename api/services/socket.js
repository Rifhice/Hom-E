const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis')(process.env.REDIS_URL);
const SensorController = require('../api/controllers/SensorController')
const ActuatorController = require('../api/controllers/ActuatorController')
const DeviceController = require('../api/controllers/DeviceController')
const WaitingForPairingController = require('../api/controllers/WaitingForPairingController')

redisAdapter.pubClient.on('error', (error) => logger.info(error));
redisAdapter.pubClient.on('connect', () => logger.info("Connected to Redis"));
let io = null
let userConnected = []

module.exports = {
    listen: (server) => {
        try {
            io = socketio(server);
            io.adapter(redisAdapter);
            io.on('connection', (socket) => {
                logger.info("A client is connected ( id: " + socket.id + " )")
                socket.on('subscribeClientToDevice', (deviceId) => {
                    io.of('/').adapter.remoteJoin(socket.id, `${deviceId}/Client`, (error) => {
                        if (error)
                            return socket.log("An error occured: " + error)
                        logger.info(`User ${socket.id} subscribed to device ${deviceId}`)
                    })
                });
                socket.on('unsubscribeClientFromDevice', (deviceId) => {
                    io.of('/').adapter.remoteLeave(socket.id, `${deviceId}/Client`, (error) => {
                        if (error)
                            return socket.log("An error occured: " + error)
                        logger.info(`User ${socket.id} succesfully unsubscribed to device ${deviceId}`)
                    })
                });
                socket.on('pairDevice', async (deviceId, callback) => {
                    logger.info(`The device ${deviceId} is trying to pair!`)
                    const pair = await WaitingForPairingController.findWithDeviceId(deviceId)
                    if (!pair) {
                        callback({
                            result: "COULD_NOT_PAIR",
                            payload: {}
                        })
                    }
                    else {
                        const realPair = await DeviceController.addDevice(pair.deviceId, pair.masterId)
                        userConnected.forEach(socket => {
                            if (socket.userId.toString() === pair.masterId.toString()) {
                                socket.emit('event', { type: 'NEW_DEVICE_PAIRED', payload: { _id: pair.deviceId, favourites: { sensors: [], actuator: [] } } })
                            }
                        })
                        if (realPair) {
                            await WaitingForPairingController.removeWithDeviceId(deviceId)
                            callback({
                                result: "success",
                                payload: {}
                            })
                        }
                    }
                })
                socket.on('userConnecting', async (userId) => {
                    logger.info(`The user ${userId} is now registered to personnal socket!`)
                    socket.userId = userId
                    userConnected.push(socket)
                })
                socket.on('userDisconnecting', async (userId) => {
                    logger.info(`The user ${userId} is now unregistered to personnal socket!`)
                    userConnected.splice(userConnected.indexOf(socket), 1)
                })
                socket.on('subscribeDevice', async (deviceId, callback) => {
                    const device = await DeviceController.getDeviceById(deviceId)
                    if (device !== null) {
                        io.of('/').adapter.remoteJoin(socket.id, `${deviceId}/Device`, (error) => {
                            if (error)
                                return socket.log("An error occured: " + error)
                            socket.deviceId = deviceId
                            logger.info(`Device ${deviceId} : ${socket.id} subscribed`)
                        })
                        callback({ result: "success", payload: {} })
                    }
                    else {
                        callback({ result: "denied", payload: {} })
                    }
                });
                socket.on('unsubscribeDevice', (deviceId) => {
                    io.of('/').adapter.remoteLeave(socket.id, `${deviceId}/Device`, (error) => {
                        if (error)
                            return socket.log("An error occured: " + error)
                        logger.info(`Device ${deviceId} : ${socket.id} succesfully unsubscribed`)
                    })
                });
                socket.on('sensor_data_mac_id', async (mac_id, callback) => {
                    try {
                        const sensor = await SensorController.getSensorById(mac_id)
                        sensor
                            ? callback({
                                result: "success",
                                payload: sensor
                            })
                            : callback({
                                result: "MAC_ID_NOT_FOUND",
                                payload: {}
                            })
                    }
                    catch (error) {
                        callback({
                            result: "INTERNAL_ERROR",
                            payload: {}
                        })
                    }
                });
                socket.on('actuator_data_mac_id', async (mac_id, callback) => {
                    try {
                        const actuator = await ActuatorController.getActuatorById(mac_id)
                        actuator
                            ? callback({
                                result: "success",
                                payload: actuator
                            })
                            : callback({
                                result: "MAC_ID_NOT_FOUND",
                                payload: {}
                            })
                    }
                    catch (error) {
                        callback({
                            result: "INTERNAL_ERROR",
                            payload: {}
                        })
                    }
                });
                socket.on("hub_event", event => {
                    io.to(`${socket.deviceId}/Client`).emit('event', event)
                })
                socket.on("disconnect", () => {
                    logger.info(`${socket.deviceId ? "Device" : "Client"} ${socket.id} disconnected`)
                })
                socket.on("error", (error) => {
                    logger.error(error)
                })
            });
            return Promise.resolve()
        } catch (error) {
            logger.error(error)
            return Promise.reject()
        }
    },
    sendToUserSocket(userId, data) {
        let isAvailable = false
        userConnected.forEach(socket => {
            if (socket.userId.toString() === userId.toString()) {
                isAvailable = true
                socket.emit('event', data)
            }
        })
        return isAvailable
    },
    broadcastToClients: (event, deviceId, data) => {
        io.to(`${deviceId}/Client`).emit(event, data)
    },
    emitToDevice: (event, deviceId, data, callback) => {
        if (io.sockets.adapter.rooms[`${deviceId}/Device`]) {
            const sockets = io.sockets.adapter.rooms[`${deviceId}/Device`].sockets
            let wasDeviceContacted = false
            let hasTimeout = false
            Object.keys(sockets).forEach(key => {
                if (sockets[key] && io.sockets.connected[key].deviceId === deviceId) {
                    let handle = setTimeout(() => { hasTimeout = true; callback({ result: "timeout" }) }, 5000)
                    io.sockets.connected[key].emit(event, data,
                        result => {
                            if (!hasTimeout) {
                                if (result.code === 200)
                                    callback({ result: "success", payload: result.data });
                                else
                                    callback({ result: "device_error", payload: result })
                                clearTimeout(handle)
                            }
                        })
                    wasDeviceContacted = true
                }
            })
            if (!wasDeviceContacted) callback({ result: "unreachable" })
        }
        else {
            callback({ result: "unreachable" })
        }
    }
}