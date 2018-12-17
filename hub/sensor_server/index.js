const SensorController = require('../controllers/SensorController')
const EnvironmentVariableController = require('../controllers/EnvironmentVariableController')
const Sensor = require("../models").Sensor;
const EnvironmentVariable = require("../models").EnvironmentVariable;
const http = require('http')
const app = http.createServer()
const io = require('socket.io').listen(app);

io.on('connection', socket => {
    socket.on('registration', async data => {
        main_server_socket.emit('sensor_data_mac_id', data.mac_id, async data => {
            try {
                const env_var = data.environment_variables.map(current => new EnvironmentVariable(current))
                const sensor = data.sensor
                sensor.environment_variables = env_var
                const sensor_to_add = new Sensor(sensor)
                await Promise.all([EnvironmentVariable.insertMany(env_var), Sensor.insertMany([sensor_to_add])])
                logger.info("A new sensor has been registered to the hub !");
                socket.emit('registered', {
                    sensorId: sensor_to_add._id,
                    environment_variables: env_var.map(val => ({ name: val.name, _id: val._id }))
                })
            }
            catch (error) {
                logger.error(error.message)
            }
        })
    });

    socket.on('sensor_connect', async data => {
        const sensor = await SensorController.getSensorById(data._id)
        if (sensor) {
            if (!sensor.isConnected) {
                socket.sensorId = data._id
                await SensorController.updateIsConnected(socket.sensorId, true)
            }
            else {
                logger.error(`A sensor tried to connect while being already connected !`)
                socket.emit('error', { type: "ALREADY_CONNECTED", payload: {} })
            }
        }
        else {
            logger.error(`A sensor tried to connect but isn't registered !`)
            socket.emit('error', { type: "NOT_REGISTERED", payload: {} })
        }
    });

    socket.on('update', async data => {
        await EnvironmentVariableController.updateEnvironmentValue(data._id, data.newValue)
    });

    socket.on('disconnect', async data => {
        await SensorController.updateIsConnected(socket.sensorId, false)
    });
});

app.listen(process.env.SENSOR_SERVER_PORT);
logger.info(`Sensor server is listening on port ${process.env.SENSOR_SERVER_PORT} !`)