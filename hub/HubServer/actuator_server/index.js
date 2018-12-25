const ActuatorController = require('../controllers').ActuatorController
const CommandController = require('../controllers').CommandController
const http = require('http')
const app = http.createServer()
const io = require('socket.io').listen(app);

const checkConnection = (func, socket) => {
    global.isConnectedToMainServer ? func() : socket.emit('err', { type: "HUB_NOT_CONNECTED_TO_MAIN_SERVER", payload: {} })
}

let actuatorConnected = []

io.on('connection', socket => {
    socket.on('registration', async data => {
        logger.info(`An actuator is trying to register to the HUB !`)
        checkConnection(() => {
            main_server_socket.emit('actuator_data_mac_id', data.mac_id, async data => {
                try {
                    if (data.result === "success") {
                        const actuator = await ActuatorController.registerActuator(data.payload.actuator, data.payload.quick_command, data.payload.commands)
                        if (actuator) {
                            logger.info("A new actuator has been registered to the hub !");
                            socket.emit('registered', {
                                actuatorId: actuator._id,
                                commands: actuator.commands.map(val => ({ name: val.name, _id: val._id }))
                            })
                        }
                        else {
                            socket.emit('err', { type: "FAILED_TO_SAVE_INSTANCE", payload: {} })
                        }
                    }
                    else {
                        socket.emit('err', { type: "MAC_ADDRESS_NOT_FOUND", payload: {} })
                    }
                }
                catch (error) {
                    logger.error(error.message)
                }
            })
        }, socket)
    });

    socket.on('actuator_connect', async data => {
        logger.info(`The actuator ${data._id} is trying to connect to the HUB !`)
        const actuator = await ActuatorController.getActuatorById(data._id)
        if (actuator) {
            if (!actuator.isConnected) {
                socket.actuatorId = data._id
                await ActuatorController.updateIsConnected(socket.actuatorId, true)
                actuatorConnected.push(socket)
                socket.emit('actuator_connected', { type: "SENSOR_SUCCESSFULLY_CONNECTED", payload: {} })
                logger.info(`The actuator ${data._id} is now connected !`)
            }
            else {
                socket.emit('err', { type: "ALREADY_CONNECTED", payload: {} })
                logger.error(`The actuator ${data._id} tried to connect while being already connected !`)
            }
        }
        else {
            socket.emit('err', { type: "NOT_REGISTERED", payload: {} })
            logger.error(`The actuator ${data._id} tried to connect but isn't registered !`)
        }
    });

    socket.on('disconnect', async data => {
        if (data && socket.actuatorId) {
            actuatorConnected.splice(actuatorConnected.indexOf(socket), 1)
            logger.info(`The actuator ${socket.actuatorId} just disconnected !`)
            await ActuatorController.updateIsConnected(socket.actuatorId, false)
        }
    });
});

app.listen(process.env.ACTUATOR_SERVER_PORT);
logger.info(`Actuator server is listening on port ${process.env.ACTUATOR_SERVER_PORT} !`)

module.exports = {
    emitOrderToActuator: async (key, argument, actuatorId, commandId) => {
        let pending = []
        let socketActuator
        actuatorConnected.forEach(actuator => {
            if (actuator.actuatorId === actuatorId) {
                socketActuator = actuator
            }
        })
        if (socketActuator) {
            socketActuator.emit('order', `${key} ${argument}`)
            const newCommand = await CommandController.updateCommandValue(commandId, argument)
            return newCommand
        }
        let error = new Error(`Actuator ${actuatorId} not connected`)
        error.code = 502
        throw error
    }
}