const ConfigController = require('../Persistance/controllers/ConfigController')

module.exports = (communicationLayer, config) => {
    const requestDispatcher = require("./requests/requestDispatcher")
    require("./sensor_server")
    require("./actuator_server")
    require("./disconnect_all_devices")
    global.main_server_socket = require('socket.io-client')(process.env.SOCKET_SERVER_URL);
    global.isConnectedToMainServer = false
    const router = require('./router')
    const database_event = require('./database_event')

    router.use(require('./routes'))

    main_server_socket.on('connect', () => {
        global.isConnectedToMainServer = true
        logger.info("Connected to the main server !")
        const registerToServer = () => {
            logger.info(`Subscribing to API!`)
            main_server_socket.emit("subscribeDevice", config.deviceId)
            main_server_socket.on('request', async (data, callback) => {
                logger.info(JSON.stringify(data))
                const result = await requestDispatcher(data)
                callback(result)
            });
            database_event.on('event', data => {
                main_server_socket.emit('hub_event', data)
            })
        }
        const pairDevice = async () => {
            logger.info("Pairing ...")
            main_server_socket.emit('pairDevice', config.deviceId, async acknoledgment => {
                if (acknoledgment.result === "success") {
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