const Actuator = require("../models").Actuator;
const Command = require("../models").Command;
const Category = require("../models").Category;
const CategoryController = require("./CategoryController");
const database_event = require('../database_event')

const getActuators = async () => {
    try {
        return await Actuator.find({}).populate([{
            path: "category",
            select: ["name"]
        },
        {
            path: "quick_command"
        },
        {
            path: "commands"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const disconnectAll = async () => {
    const actuators = await Actuator.find({})
    actuators.forEach(async actuator => await updateIsConnected(actuator._id, false))
}

const updateIsConnected = async (actuatorId, isConnected) => {
    try {
        const actuator = await Actuator.findOneAndUpdate({ _id: actuatorId },
            { $set: { isConnected } }, { "new": true })
        database_event.emit('event', { type: "UPDATE_ACTUATOR_ISCONNECTED", payload: { _id: actuator._id, isConnected } })
        return actuator
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const registerActuator = async (actuator, quick_command, commands) => {
    try {
        actuator._id = undefined
        let newCommands = commands.map(current => { current._id = undefined; return new Command(current) })
        let newQuick_command = new Command(quick_command)
        actuator.commands = [newQuick_command, ...newCommands]
        actuator.quick_command = newQuick_command
        if (actuator.category) {
            const category = await CategoryController.getCategoryById(actuator.category._id)
            if (category) {
                logger.info("CATEGORY ALREADY EXISTED " + actuator.category._id)
                actuator.category = actuator.category._id
            }
            else {
                const newCategory = await Category.insertMany([new Category(actuator.category)])
                logger.info("NEW CATEGORY CREATED " + newCategory[0]._id)
                actuator.category = newCategory[0]._id
            }
        }
        const actuator_to_add = new Actuator(actuator)
        await Promise.all([Command.insertMany([newQuick_command, ...newCommands]), Actuator.insertMany([actuator_to_add])])
        database_event.emit('event', { type: "REGISTERED_ACTUATOR", payload: { actuator: actuator_to_add } })
        return actuator_to_add
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getActuatorById = async (sensorId) => {
    try {
        return await Actuator.findOne({ _id: sensorId }).populate([{
            path: "category",
            select: ["name"]
        },
        {
            path: "quick_command"
        },
        {
            path: "commands"
        }])
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};



module.exports = {
    getActuators,
    updateIsConnected,
    registerActuator,
    getActuatorById,
    disconnectAll
};
