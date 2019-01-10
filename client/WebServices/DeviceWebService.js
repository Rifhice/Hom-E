import axios from 'axios'
import config from '../config'
import { tokenHeader } from '../helper/HeaderHelper'
export default {
    async getDeviceUsers(deviceId) {
        const res = await axios.get(`${config.API_URL}/Devices/${deviceId}/Users`, await tokenHeader())
        return res.data
    }
}