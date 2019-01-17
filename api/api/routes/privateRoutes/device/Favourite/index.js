const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../../../middlewares/CheckRequest')
const { favouriteValidator } = require('../../../../validations/privateRoutes');

router.get('/', favouriteValidator.getFavourites, checkRequest, require('./getFavourites'));
router.post('/', favouriteValidator.addFavourite, checkRequest, require('./addFavourite'));
router.delete('/:favouriteId', favouriteValidator.removeFavourite, checkRequest, require('./removeFavourite'));

module.exports = router;
