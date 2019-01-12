import axios from 'axios'
import config from '../config'
import { tokenHeader } from '../helper/HeaderHelper'
export default {
    async getUserByUsername(query) {
        const res = await axios.get(`${config.API_URL}/Users?username=${query}`, await tokenHeader())
        return res.data
    }
}