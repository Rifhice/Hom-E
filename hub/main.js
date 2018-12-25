require('./Persistance')
const controllers = require('./Persistance/controllers')
const mongoose = require('mongoose')
const isOnline = require('is-online');
global.logger = require('./logger')

const config = controllers.ConfigController

//config.clearConfig()
const start = () => {
config.getConfig().then(async config => {
    if (!config) {
	logger.info('Creating new configuration')
        config = await controllers.ConfigController.updateConfig({
            deviceId: new mongoose.Types.ObjectId(),
            previousState: "access-point",
            isAccessPointOn: true,
            isOnOfflineMode: false,
            isPaired: false
        })
    }
    const previousState = config.previousState; logger.info(`previousState => ${previousState}`)
    const isAccessPointOn = config.isAccessPointOn; logger.info(`isAccessPointOn => ${isAccessPointOn}`)
    const isConnectedToInternet = await isOnline(); logger.info(`isConnectedToInternet => ${isConnectedToInternet}`)
    const isOnOfflineMode = config.isOnOfflineMode; logger.info(`isOnOfflineMode => ${isOnOfflineMode}`)
    const isPaired = config.isPaired; logger.info(`isPaired => ${isPaired}`) //Should be handled in the HUB server

    if (!isConnectedToInternet && isAccessPointOn && !isOnOfflineMode) {
        logger.info("Waiting for pairing")
        //Currently supposed to wait for pairing
        //Start the credential server
        require('./PairingServer')
    }
    else if (isConnectedToInternet && !isAccessPointOn && !isOnOfflineMode) {
        logger.info("Starts the hub (online mode)")
        //The hub should be running and be connected to the API, if not paired should carry out the pairing process with the API
        //Start the main program
        require('./HubServer')("online", config)
    }
    else if (isOnOfflineMode && !isAccessPointOn) {
        logger.info("Switching to access point")
        //Should start the access point
        //Switch to access point
    }
    else if (isOnOfflineMode && isAccessPointOn) {
        logger.info("Starts the hub (offline mode)")
        //Should start an offline server
        // ???
    }
    else if (!isAccessPointOn && !isConnectedToInternet && !isOnOfflineMode && previousState === "access-point") {
        logger.info("Something went wrong with the credentials restarting in access point mode")
        //Something went wrong when trying to connect to the wifi network. Reboot in AP ?
        //Switch to access point
    }
    else if (!isAccessPointOn && !isConnectedToInternet && !isOnOfflineMode) {
        logger.info("No internet connection")
        //How to display error ?
    }
    else {
        console.log("????")
    	setTimeout(start, 2000)
	}
})
}
start()
