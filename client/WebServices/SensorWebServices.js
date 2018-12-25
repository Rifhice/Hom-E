import axios from 'axios'
import config from '../config'

export default {
    async getSensors(deviceId) {
        const res = await axios.get(`${config.API_URL}/Devices/${deviceId}/Sensors`)
        return res.data
    }
}