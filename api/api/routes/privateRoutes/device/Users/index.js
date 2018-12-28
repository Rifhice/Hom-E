const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRight = require('../../../../middlewares/CheckRights')

router.get('/', require('./getUsers'));
router.post('/', checkRight({}), require('./addUser'));
router.delete('/', checkRight({}), require('./removeUser'));
/*
router.post('/:userId/Rights', require('./addRight'));
router.delete('/:userId/Rights', require('./removeRight'));
router.put('/:userId/Rank', require('./updateRank'));*/


module.exports = router;
