require("dotenv").config();
const requestDispatcher = require("./requests/requestDispatcher")
global.logger = require("./logger")
require("./config/db");
require("./sensor_server")
global.main_server_socket = require('socket.io-client')(process.env.SOCKET_SERVER_URL);
global.isConnectedToMainServer = false
const router = require('./router')
const database_event = require('./database_event')

router.use(require('./routes'))

main_server_socket.on('connect', () => {
    global.isConnectedToMainServer = true
    logger.info("Connected to the main server !")
    main_server_socket.emit("subscribeDevice", "5bf6962756d95f001c853c1a")
    database_event.on('event', data => {
        main_server_socket.emit('hub_event', data)
    })
});
main_server_socket.on('request', async (data, callback) => {
    logger.info(JSON.stringify(data))
    const result = await requestDispatcher(data)
    callback(result)
});
main_server_socket.on('disconnect', () => {
    global.isConnectedToMainServer = false
    logger.info("Disconnected")
});
main_server_socket.on('error', (error) => {
    logger.info(`Error : ${error}`)
});