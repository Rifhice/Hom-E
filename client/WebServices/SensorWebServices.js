import axios from 'axios'
import config from '../config'

export default {
    async getSensors(deviceId) {
        const res = await axios.get(`${config.API_URL}/device/${deviceId}/Sensors`)
        return res.data
    }
}