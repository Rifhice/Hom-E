const mongoose = require("mongoose");
const Actuator = require("./models").Actuator;
const Command = require("./models").Command;
const Category = require("./models").Category;
const Sensor = require("./models").Sensor;
const EnvironmentVariable = require("./models").EnvironmentVariable;
const Behavior = require("./controllers").BehaviorController;
const ComplexCommand = require("./models").ComplexCommand;
const Config = require("./models").Config;
global.logger = require('../logger')

require("dotenv").config({});
connect();

function connect() {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    })
}

const initDB = async () => {
    console.log("Init")
    let array = [];
    for (const collection in mongoose.connection.collections) {
        array.push(mongoose.connection.collections[collection].deleteMany());
    }
    await Promise.all(array);
    const config = new Config({
        deviceId: new mongoose.Types.ObjectId(),
        previousState: "access-point",
        isAccessPointOn: false,
        isOnOfflineMode: false,
        isPaired: false
    })
    /*
        const config = new Config({
            deviceId: new mongoose.Types.ObjectId(),
            previousState: "access-point",
            isAccessPointOn: false,
            isOnOfflineMode: false,
            isPaired: false
        })
    
        const category_light = new Category({
            name: "Lights",
            description: "Represent all the different lighting devices"
        })
    
        const category_presence = new Category({
            name: "Presence",
            description: "Represent all the different presence related devices"
        })
    
        const command_light = new Command({
            name: "Polarity",
            description: "Turn on or off",
            type: "switch",
            key: "set",
            command_arguments: [
                { "type": "discrete", "possible_values": ["on", "off"], "current": "on" }
            ]
        })
    
        const command_light2 = new Command({
            name: "Brightness",
            description: "Change the brightness",
            type: "slider",
            key: "brigth",
            command_arguments: [
                { "type": "continuous", "min": 0, "max": 100, "precision": 1, "current": 50 }
            ]
        })
    
        const living_room_light = new Actuator({
            name: "Living Room",
            description: "Main light of the living room",
            isConnected: false,
            category: category_light._id,
            quick_command: command_light2._id,
            commands: [command_light._id, command_light2._id]
        })
    
        const environment_variable_presence_sensor_1 = new EnvironmentVariable({
            name: "Presence",
            description: "Is someone in the room",
            unit: "N/A",
            value: {
                value_type: "boolean",
                current: true
            }
        })
    
        const environment_variable_presence_sensor_2 = new EnvironmentVariable({
            name: "Distance",
            description: "The distance of the person to the sensor",
            unit: "cm",
            value: {
                value_type: "number",
                max: 100,
                min: 0,
                current: 50
            }
        })
    
        const presence_sensor = new Sensor({
            name: "Presence sensor",
            description: "Sense the presence of people",
            isConnected: false,
            category: category_presence._id,
            environment_variables: [
                environment_variable_presence_sensor_1._id,
                environment_variable_presence_sensor_2._id
            ]
        })
    
        const complex_command = new ComplexCommand({
            name: "Nice mood",
            description: "Turn lights on and to 80% brightness",
            orders: [{
                actuatorId: living_room_light._id,
                executable: "brigth 80",
            }, {
                actuatorId: living_room_light._id,
                executable: "set on",
            }],
        })
    
        const insertEnvVarAndBehaviors = EnvironmentVariable.insertMany([environment_variable_presence_sensor_1, environment_variable_presence_sensor_2])
    
        array.push(Category.insertMany([category_light]));
        array.push(Command.insertMany([command_light, command_light2]));
        array.push(Actuator.insertMany([living_room_light]));
        array.push(insertEnvVarAndBehaviors);
        array.push(Sensor.insertMany([presence_sensor]))
        array.push(ComplexCommand.insertMany([complex_command]))
    */
    array = [];
    array.push(Config.insertMany([config]));
    Promise.all(array).then(() => {
        logger.info("Init DB successful");
        logger.info("Closing the connection to the database");
        mongoose.connection.close();
    }).catch(error => logger.error(error.message))
}

mongoose.connection.once("open", async function () {
    logger.info("Connected to MongoDB");
    await initDB()
}).catch(err => logger.error(error.message));
