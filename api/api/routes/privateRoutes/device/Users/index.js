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

router.post('/:userId/Restrictions', userValidator.addRestriction, checkRequest, checkRight({
    target: "",
    entity: "restriction",
    action: "add"
}), require('./addRestrictions'));

router.delete('/:userId/Restrictions/:restrictionId', userValidator.removeRestriction, checkRequest, checkRight({
    target: "",
    entity: "restriction",
    action: "remove"
}), require('./removeRestrictions'));
//router.put('/:userId/Rank', require('./updateRank'));


module.exports = router;
