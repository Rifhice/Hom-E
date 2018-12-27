import axios from 'axios'
import config from '../config'
import { tokenHeader } from '../helper/HeaderHelper'
export default {
    async getSensors(deviceId) {
        const res = await axios.get(`${config.API_URL}/Devices/${deviceId}/Sensors`, await tokenHeader())
        return res.data
    }
}