const ConfigController = require('../Persistance/controllers').ConfigController
const exec = require('child_process').exec;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/WifiCredentials',async (req, res) => {
    const SSID = req.body.SSID
    const password = req.body.password
    logger.info(`Received credentials : SSID : ${SSID}, Password : ${password}`)
    if (!SSID || !password)
        res.status(400).send('Invalid arguments')
    else {
	const config = await ConfigController.updateConfig({
                    previousState: "access-point",
                    isAccessPointOn: false
        })
	res.status(200).send({ deviceId: config.deviceId })
        exec(`sudo bash ../AccessPointScripts/save-creds.sh ${SSID} ${password}`, (err, stdout, stderr) => {
            exec(`sudo bash ./AccessPointScripts/remove-access-point.sh`, async (err, stdout, stderr) => {
		console.log(stdout)                
                setTimeout(() => {
                    exec(`sudo reboot`)
                }, 2000)
            });
        });
    }
});
app.listen(process.env.PAIRING_SERVER_PORT, () => {
    logger.info(`Example app listening on port ${process.env.PAIRING_SERVER_PORT}.`);
});
