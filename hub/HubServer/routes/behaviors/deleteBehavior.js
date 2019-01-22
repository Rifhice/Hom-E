const Behavior = require('../../controllers').BehaviorController

module.exports = async req => {
    try {
        return { code: 200, data: await Behavior.removeBehavior(req.params.behaviorId) }
    }
    catch (error) {
        logger.error(error)
        return { code: 500, message: "Internal device error" }
    }
}