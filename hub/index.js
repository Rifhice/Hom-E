require("dotenv").config();
const requestDispatcher = require("./requests/requestDispatcher")
global.logger = require("./logger")
require("./config/db");
require("./sensor_server")
global.main_server_socket = require('socket.io-client')(process.env.SOCKET_SERVER_URL);

const router = require('./router')


router.use(require('./routes'))

main_server_socket.on('connect', () => {
    logger.info("Connected to the main server !")
    main_server_socket.emit("subscribeDevice", "5bf6962756d95f001c853c1a")
});
main_server_socket.on('request', async (data, callback) => {
    logger.info(JSON.stringify(data))
    const result = await requestDispatcher(data)
    callback(result)
});
main_server_socket.on('disconnect', () => {
    logger.info("Disconnected")
});
main_server_socket.on('error', (error) => {
    logger.info(`Error : ${error}`)
});