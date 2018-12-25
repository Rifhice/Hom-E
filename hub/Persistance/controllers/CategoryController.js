const Category = require("../models").Category;

const getCategories = async () => {
    try {
        return await Category.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const getCategoryById = async (id) => {
    try {
        return await Category.findOne({ _id: id })
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

module.exports = {
    getCategories,
    getCategoryById
};
