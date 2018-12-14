require("dotenv").config();
const requestDispatcher = require("./requests/requestDispatcher")
global.logger = require("./logger")
let socket = require('socket.io-client')(process.env.SOCKET_SERVER_URL);

const router = require('./router')

router.use(require('./routes'))

socket.on('connect', () => {
    logger.info("Connected")
    socket.emit("subscribeDevice", "5bf6962756d95f001c853c1a")
});
socket.on('request', async (data, callback) => {
    logger.info(JSON.stringify(data))
    const result = await requestDispatcher(data)
    callback(result)
});
socket.on('disconnect', () => {
    logger.info("Disconnected")
});
socket.on('error', (error) => {
    logger.info(`Error : ${error}`)
});