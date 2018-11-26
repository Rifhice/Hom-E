require("dotenv").config();
global.logger = require("./logger")
let socket = require('socket.io-client')(process.env.SOCKET_SERVER_URL);

socket.on('connect', () => {
    logger.info("Connected")
});
socket.on('event', (data) => {
    logger.info(data)
});
socket.on('disconnect', () => {
    logger.info("Disconnected")
});
socket.on('error', (error) => {
    logger.info(`Error : ${error}`)
});