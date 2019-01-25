import axios from 'axios'
import config from '../config'
import { tokenHeader } from '../helper/HeaderHelper'
export default {
    async getBehaviors(deviceId) {
        const res = await axios.get(`${config.API_URL}/Devices/${deviceId}/Behaviors`, await tokenHeader())
        return res.data
    },
    async addBehavior(deviceId, behavior) {
        console.log(behavior)
        const res = await axios.post(`${config.API_URL}/Devices/${deviceId}/Behaviors`, { behavior }, await tokenHeader())
        return res.data
    },
    async deleteBehavior(deviceId, behaviorId) {
        const res = await axios.delete(`${config.API_URL}/Devices/${deviceId}/Behaviors/${behaviorId}`, await tokenHeader())
        return res.data
    }
}