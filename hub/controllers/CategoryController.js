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

module.exports = {
    getCategories
};
