const throwError = require("../../helper/RequestHelper").throwError;
const logger = require("../../../logger")
/*
const funcs = {
    "in:Board": inBoard,
    "status:Board:Admin": isBoardAdmin,
    "in:Team": inTeam,
    "status:Team:Admin": isTeamAdmin
}
*/
const checkRightsFromBoard = (toCheck, idIsInBody = false) => async (req, res, next) => {
    return true
}

const checkRightsFromCard = (toCheck, idIsInBody = false) => async (req, res, next) => {
    return true
}

const checkRightsFromList = (toCheck, idIsInBody = false) => async (req, res, next) => {
    return true
}

const checkRightsFromTeam = (toCheck, idIsInBody = false) => async (req, res, next) => {
    return true
}
/*
const checkRights = (toCheck, userId, board, team, method) => {
    for (const atom of toCheck) {
        if (!funcs[atom])
            logger.error(`Unknow right to check ${atom}`)
        if (funcs[atom] && !funcs[atom](userId, board, team, method))
            return false
    }
    return true
}
*/
module.exports = {
    checkRightsFromBoard,
    checkRightsFromCard,
    checkRightsFromList,
    checkRightsFromTeam
};