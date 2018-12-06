require("dotenv").config();
const express = require('express');
const app = express();
const port_api = process.env.API_PORT || 5000;
const port_socket = process.env.SOCKET_PORT || 6000
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser');
const swaggerJSDoc = require('./api/swagger.js')
const swaggerUi = require('swagger-ui-express');
require("./config/db");
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

app.use(cors())
// API calls
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

app.use('/api', require("./api"));

const server = app.listen(port_api, () => logger.info(`Api is listening on port ${port_api} !`));
startSocketServer(server, port_socket)
module.exports = app;