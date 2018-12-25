const User = require("../models").User;

const getUsers = async () => {
    try {
        return await User.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};
const getUserById = async (UserId) => {
    try {
        return await User.findOne({ _id: UserId })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username: username })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addUser = async (username, hash) => {
    try {
        const user = new User({
            username,
            hash
        })
        return await user.save()
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    getUserByUsername
};
