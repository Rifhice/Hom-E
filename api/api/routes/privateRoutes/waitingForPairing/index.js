const express = require('express');
const router = express.Router({ mergeParams: true });
const WaitingForPairingController = require('../../../controllers/WaitingForPairingController')

//TO REMOVE
router.get('/', async (req, res) => {
    const result = await WaitingForPairingController.getWaitingForPairings()
    res.status(200).send(result)
});
//TO REMOVE


router.post('/', async (req, res) => {
    const result = await WaitingForPairingController.addWaitingForPairingDevice(req.body.deviceId, req.user._id)
    res.status(201).send(result)
});

module.exports = router;