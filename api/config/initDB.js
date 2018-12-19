const mongoose = require("mongoose");
const Sensor = require("../api/models/index").Sensor;
const Actuator = require("../api/models/index").Actuator;
const Category = require("../api/models/index").Category;
const logger = require('../logger')

require("dotenv").config({});
connect();

function connect() {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    })
}

async function initDB() {
    let array = [];
    for (const collection in mongoose.connection.collections) {
        array.push(mongoose.connection.collections[collection].deleteMany());
    }
    await Promise.all(array);

    const category_light = new Category({
        name: "Lights",
        description: "Represent all the different lighting devices"
    })

    const category_presence = new Category({
        name: "Presence",
        description: "Represent all the different presence related devices"
    })

    const presence_sensor = Sensor({
        _id: "5c1a9c2467f0664ecc30bdbc",
        sensor: {
            name: "Presence sensor",
            description: "Sense the presence of people",
            isConnected: false,
            category: category_presence._id,
        },
        environment_variables: [
            {
                name: "Distance",
                description: "The distance of the person to the sensor",
                unit: "cm",
                value: {
                    value_type: "number",
                    max: 100,
                    min: 0,
                    current: 50
                }
            },
            {
                name: "Presence",
                description: "Is someone in the room",
                unit: "N/A",
                value: {
                    value_type: "boolean",
                    current: true
                }
            }
        ]
    })

    const light_actuator = new Actuator({
        _id: "5c1a9c4598f0664ecc30bdbc",
        actuator: {
            name: "Living Room",
            description: "Main light of the living room",
            isConnected: false,
            category: category_light._id
        },
        quick_command: {
            name: "Polarity",
            description: "Turn on or off",
            type: "switch",
            key: "set",
            command_arguments: [
                { "type": "discrete", "possible_values": ["on", "off"], "current": "on" }
            ]
        },
        commands: [
            {
                name: "Brightness",
                description: "Change the brightness",
                type: "slider",
                key: "brigth",
                command_arguments: [
                    { "type": "continuous", "min": 0, "max": 100, "precision": 1, "current": 50 }
                ]
            }]
    })

    array = [];
    array.push(Category.insertMany([category_light, category_presence]));
    array.push(Sensor.insertMany([presence_sensor]));
    array.push(Actuator.insertMany([light_actuator]))
    Promise.all(array).then(() => {
        logger.info("Init DB successful");
        logger.info("Closing the connection to the database");
        mongoose.connection.close();
    }).catch(error => logger.error(error.message))
    console.log(presence_sensor)
}

mongoose.connection.once("open", async function () {
    logger.info("Connected to MongoDB");
    await initDB()
}).catch(err => logger.error(error.message));
