const Behavior = require("../models").Behavior;
const Environment_variableController = require('./EnvironmentVariableController')

const addBehavior = async (behavior) => {
    try {
        const behaviorToAdd = new Behavior(behavior)
        const extractEnvironmentVariableFromEvaluableBis = (evaluable, state) => {
            if (evaluable.type === "expression") {
                state = extractEnvironmentVariableFromEvaluableBis(
                    evaluable.evaluable[0],
                    extractEnvironmentVariableFromEvaluableBis(evaluable.evaluable[1], state)
                );
            } else if (evaluable.type === "block") {
                state.push(evaluable.variable);
            }
            return state;
        }
        extractEnvironmentVariableFromEvaluableBis(behaviorToAdd.evaluable, []).map(async (env_var) => {
            await Environment_variableController.addBehavior(env_var, behaviorToAdd._id)
        })
        await behaviorToAdd.save()
        return behaviorToAdd
    }
    catch (error) {
        logger.error(error)
    }
}

const getBehaviors = async () => {
    try {
        return await Behavior.find({})
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

const getGetTriggeredBehavior = async (env_var) => {
    try {
        const checkEval = async (eval) => {
            if (eval.type === "expression") {
                return await checkExpression(eval);
            } else if (eval.type === "block") {
                return await checkBlock(eval);
            }
        }
        const checkExpression = async (expression) => {
            const resultFirst = await checkEval(expression.evaluable[0])
            const resultSecond = await checkEval(expression.evaluable[1])
            return expression.operator == "&&"
                ? resolve(resultFirst && resultSecond)
                : resolve(resultFirst || resultSecond)

        }
        const checkBlock = async (block) => {
            const convertToType = (type, value) => {
                if (type === "Boolean") {
                    return typeof value !== 'boolean' ? value == 'true' : value
                }
                else if (type === "Number") {
                    return Number(value)
                }
                else {
                    return value
                }
            }
            const environment_variable = await Environment_variableController.getEnvironmentVariableById(block.variable)
            const current_value = convertToType(block.valueType, environment_variable.value.current);
            const value = convertToType(block.valueType, block.value);
            switch (block.operator) {
                case "==":
                    return value == current_value
                case "!=":
                    return value != current_value
                case "<=":
                    return current_value <= value
                case ">=":
                    return current_value >= value
                case "<":
                    return current_value < value
                case ">":
                    return current_value > value
            }
        }
        const env = await Environment_variableController.getEnvironmentVariableById(env_var)
        const behaviors = env.behaviors
        let results = []
        const checkBehavior = async (behavior) => {
            const res = await checkEval(behavior.evaluable)
            if (res) results.push(behavior)
        }
        await Promise.all(behaviors.map(behavior => checkBehavior(behavior)))
        return results
    }
    catch (error) {
        logger.error(error.message)
        throw error
    }
};

module.exports = {
    getBehaviors,
    addBehavior,
    getGetTriggeredBehavior
};
