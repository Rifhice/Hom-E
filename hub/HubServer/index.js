const ConfigController = require('../Persistance/controllers/ConfigController')
const BehaviorController = require('./controllers').BehaviorController
const ActuatorServer = require('./actuator_server')

module.exports = (communicationLayer, config) => {
    const requestDispatcher = require("./requests/requestDispatcher")
    require("./sensor_server")
    require("./actuator_server")
    require("./disconnect_all_devices")
    global.main_server_socket = require('socket.io-client')(process.env.SOCKET_SERVER_URL);
    global.isConnectedToMainServer = false
    const router = require('./router')
    const database_event = require('../Persistance/database_event')

    router.use(require('./routes'))

    main_server_socket.on('connect', () => {
        global.isConnectedToMainServer = true
        logger.info("Connected to the main server !")
        const registerToServer = () => {
            logger.info(`Subscribing to API!`)
            main_server_socket.emit("subscribeDevice", config.deviceId, async acknowledgment => {
                if (acknowledgment.result === "denied") {
                    await ConfigController.updateConfig({
                        isPaired: false
                    })
                    pairDevice()
                }
                else {
                    main_server_socket.on('request', async (data, callback) => {
                        logger.info(JSON.stringify(data))
                        const result = await requestDispatcher(data)
                        callback(result)
                    });
                    database_event.on('event', async data => {
                        main_server_socket.emit('hub_event', data)
                        if (data.type === "UPDATE_ENVIRONMENT_VARIABLE_VALUE") {
                            const behaviorsTriggered = await BehaviorController.getGetTriggeredBehavior(data.payload._id)
                            behaviorsTriggered.map(async behaviorTriggered => {
                                try {
                                    if (!behaviorTriggered.command.iscomplex)
                                        await ActuatorServer.emitOrderToActuator(behaviorTriggered.command.key, behaviorTriggered.command.argument, behaviorTriggered.command.actuatorId, behaviorTriggered.command.commandId)
                                }
                                catch (error) {
                                    logger.error(error.message)
                                }
                            })
                        }
                    })
                }
            })
        }
        const pairDevice = async () => {
            logger.info("Pairing ...")
            main_server_socket.emit('pairDevice', config.deviceId, async acknowledgment => {
                if (acknowledgment.result === "success") {
                    await ConfigController.updateConfig({
                        isPaired: true
                    })
                    registerToServer()
                }
                else setTimeout(pairDevice, 3000)
            })
        }
        config.isPaired ? registerToServer() : pairDevice()
    });
    main_server_socket.on('disconnect', () => {
        global.isConnectedToMainServer = false
        logger.info("Disconnected")
    });
    main_server_socket.on('error', (error) => {
        logger.info(`Error : ${error}`)
    });
}