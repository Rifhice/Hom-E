const Categories = require('../../controllers').CategoryController

module.exports = async req => {
    try {
        return { code: 200, data: await Categories.getCategories() }
    }
    catch (error) {
        logger.error(error)
        return { code: 500, message: "Internal device error" }
    }
}