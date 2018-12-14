import axios from 'axios'
import config from '../config'

export default {
    async getActuators(deviceId) {
        const res = await axios.get(`${config.API_URL}/device/${deviceId}/actuators`)
        return res.data
    }
}