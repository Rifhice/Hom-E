const mongoose = require("mongoose");
const Actuator = require("../models").Actuator;
const Command = require("../models").Command;
const Category = require("../models").Category;
const logger = require('../logger')

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

    const category_light = new Category({
        name: "Lights",
        description: "Represent all the different lighting devices"
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
        category: category_light._id,
        quick_command: command_light2._id,
        commands: [command_light._id, command_light2._id]
    })

    array = [];
    array.push(Category.insertMany([category_light]));
    array.push(Command.insertMany([command_light, command_light2]));
    array.push(Actuator.insertMany([living_room_light]));

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
