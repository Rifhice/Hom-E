import axios from 'axios'
import config from '../config'
import { tokenHeader } from '../helper/HeaderHelper'
export default {
    async getActuators(deviceId) {
        const res = await axios.get(`${config.API_URL}/Devices/${deviceId}/Actuators`, await tokenHeader())
        return res.data
    },
    async executeOrder(deviceId, key, argument, actuatorId, commandId) {
        const res = await axios.post(`${config.API_URL}/Devices/${deviceId}/Actuators/${actuatorId}/Order`, { commandId, key, argument }, await tokenHeader())
        return res.data
    }
}