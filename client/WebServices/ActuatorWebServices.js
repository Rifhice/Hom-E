import axios from 'axios'
import config from '../config'

export default {
    async getActuators(deviceId) {
        const res = await axios.get(`${config.API_URL}/device/${deviceId}/Actuators`)
        return res.data
    },
    async executeOrder(deviceId, key, argument, actuatorId, commandId) {
        const res = await axios.post(`${config.API_URL}/device/${deviceId}/Actuators/${actuatorId}/Order`, { commandId, key, argument })
        return res.data
    }
}