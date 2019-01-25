import StringInterpolation from './stringInterpolation'
const evaluableToSentence = (evaluable, t) => {
    const operatorToString = {
        ">=": t("superiorOrEqual"),
        "<=": t("inferiorOrEqual"),
        ">": t("superior"),
        "<": t("inferior"),
        "==": t("equal"),
        "!=": t("notEqual"),
        "&&": t("and"),
        "||": t("or")
    }
    if (evaluable.type === "block") {
        if (evaluable.valueType === "Boolean")
            return StringInterpolation(t('booleanSensor'), evaluable.variable.name, evaluable.value ? evaluable.operator === "==" ? t("detected") : t("notDetected") : evaluable.operator === "==" ? t("notDetected") : t("detected"))
        return StringInterpolation(t('numberSensor'), evaluable.variable.name, operatorToString[evaluable.operator], evaluable.value)
    }
    else if (evaluable.type === "expression") {
        if (evaluable.evaluable[0].type === "expression" && evaluable.evaluable[1].type === "block")
            return `${evaluableToSentence(evaluable.evaluable[1], t)} ${operatorToString[evaluable.operator]} ${evaluable.operator === "&&" && evaluable.evaluable[0].type === "expression" && evaluable.evaluable[0].operator === "||" ? t("either") : ""}${evaluableToSentence(evaluable.evaluable[0], t)}`
        else
            return `${evaluableToSentence(evaluable.evaluable[0], t)} ${operatorToString[evaluable.operator]} ${evaluable.operator === "&&" && evaluable.evaluable[1].type === "expression" && evaluable.evaluable[1].operator === "||" ? t("either") : ""}${evaluableToSentence(evaluable.evaluable[1], t)}`
    }
}

const commandToSentence = (command, t) => {
    let commandObject = null
    command.actuator.commands.forEach(com => {
        if (com._id === command.commandId) commandObject = com
    })
    if (commandObject !== null) {
        if (commandObject.type === "switch") {
            return StringInterpolation(t('booleanOrder'), command.argument ? t("turnOn") : t("turnOff"), commandObject.name, command.actuator.name)
        }
        else if (commandObject.type === "slider") {
            return StringInterpolation(t('sliderOrder'), commandObject.name, command.actuator.name, command.argument)
        }
    }
}
module.exports = {
    evaluableToSentence,
    commandToSentence
}