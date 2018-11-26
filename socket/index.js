require("dotenv").config();
global.logger = require('./logger')

let startSocketServer = async (http, port) => {
    try {
        var io = await require('./socket').listen(http)
        logger.info(`Socket server is now listening on port ${port} !`)
    }
    catch (error) {
        logger.info("Unable to start the socket server !")
    }
}
let http = require('http').createServer().listen(process.env.PORT, '0.0.0.0');
startSocketServer(http, process.env.PORT) 