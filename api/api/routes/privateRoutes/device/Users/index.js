const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRight = require('../../../../middlewares/CheckRights')
const checkRequest = require('../../../../middlewares/CheckRequest')
const { userValidator } = require('../../../../validations/privateRoutes');

router.get('/', require('./getUsers'));

router.post('/', userValidator.addUser, checkRequest, checkRight({
    target: "",
    entity: "user",
    action: "add"
}), require('./addUser'));

router.delete('/:userId', userValidator.removeUser, checkRequest, checkRight({
    target: "",
    entity: "user",
    action: "remove"
}), require('./removeUser'));

router.get('/:userId/Restrictions', userValidator.getRestrictions, checkRequest, checkRight({
    target: "",
    entity: "restriction",
    action: "update"
}), require('./getRestrictions'));

router.post('/:userId/Restrictions', userValidator.addRestriction, checkRequest, checkRight({
    target: "",
    entity: "restriction",
    action: "update"
}), require('./addRestrictions'));

router.delete('/:userId/Restrictions/:restrictionId', userValidator.removeRestriction, checkRequest, checkRight({
    target: "",
    entity: "restriction",
    action: "update"
}), require('./removeRestrictions'));

router.put('/:userId/Rank', userValidator.updateRank, checkRequest, checkRight({
    target: "",
    entity: "rank",
    action: "update"
}), require('./updateRank'));

module.exports = router;