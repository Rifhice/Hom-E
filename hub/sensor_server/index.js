const SensorController = require('../controllers/SensorController')
const EnvironmentVariableController = require('../controllers/EnvironmentVariableController')
const http = require('http')
const app = http.createServer()
const io = require('socket.io').listen(app);

const checkConnection = (func, socket) => {
    global.isConnectedToMainServer ? func() : socket.emit('err', { type: "HUB_NOT_CONNECTED_TO_MAIN_SERVER", payload: {} })
}

io.on('connection', socket => {
    socket.on('registration', async data => {
        logger.info(`A sensor is trying to register to the HUB !`)
        checkConnection(() => {
            main_server_socket.emit('sensor_data_mac_id', data.mac_id, async data => {
                try {
                    if (data.result === "success") {
                        const sensor = await SensorController.registerSensor(data.payload.sensor, data.payload.environment_variables)
                        if (sensor) {
                            logger.info("A new sensor has been registered to the hub !");
                            socket.emit('registered', {
                                sensorId: sensor._id,
                                environment_variables: sensor.environment_variables.map(val => ({ name: val.name, _id: val._id }))
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

    socket.on('sensor_connect', async data => {
        logger.info(`The sensor ${data._id} is trying to connect to the HUB !`)
        const sensor = await SensorController.getSensorById(data._id)
        if (sensor.length !== 0) {
            if (!sensor.isConnected) {
                socket.sensorId = data._id
                await SensorController.updateIsConnected(socket.sensorId, true)
                socket.emit('sensor_connected', { type: "SENSOR_SUCCESSFULLY_CONNECTED", payload: {} })
                logger.info(`The sensor ${data._id} is now connected !`)
            }
            else {
                socket.emit('err', { type: "ALREADY_CONNECTED", payload: {} })
                logger.error(`The sensor ${data._id} tried to connect while being already connected !`)
            }
        }
        else {
            socket.emit('err', { type: "NOT_REGISTERED", payload: {} })
            logger.error(`The sensor ${data._id} tried to connect but isn't registered !`)
        }
    });

    socket.on('update', async data => {
        logger.info(`The sensor ${socket.sensorId} is updating a variable !`)
        await EnvironmentVariableController.updateEnvironmentValue(data._id, data.newValue)
    });

    socket.on('disconnect', async data => {
        if (data && socket.sensorId) {
            logger.info(`The sensor ${socket.sensorId} just disconnected !`)
            await SensorController.updateIsConnected(socket.sensorId, false)
        }
    });
});

app.listen(process.env.SENSOR_SERVER_PORT);
logger.info(`Sensor server is listening on port ${process.env.SENSOR_SERVER_PORT} !`)