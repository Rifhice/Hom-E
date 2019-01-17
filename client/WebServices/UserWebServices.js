import axios from 'axios'
import config from '../config'
import { tokenHeader } from '../helper/HeaderHelper'

export default {
    async register(data) {
        const res = await axios.post(`${config.API_URL}/Register`, data)
        return res.data
    },
    async login(data) {
        const res = await axios.post(`${config.API_URL}/Login`, data)
        return res.data
    },
    async getInformation() {
        const res = await axios.get(`${config.API_URL}/Me/Informations`, await tokenHeader())
        return res.data
    },
    async updateCurrentDevice(deviceId) {
        const res = await axios.put(`${config.API_URL}/Me/CurrentDevice`, { deviceId }, await tokenHeader())
        return res.data
    },
    async updateLanguage(language) {
        const res = await axios.put(`${config.API_URL}/Me/Language`, { language }, await tokenHeader())
        return res.data
    },
    async updateTheme(theme) {
        const res = await axios.put(`${config.API_URL}/Me/Theme`, { theme }, await tokenHeader())
        return res.data
    },
    async fetchFavourites(deviceId) {
        const res = await axios.get(`${config.API_URL}/Devices/${deviceId}/Favourites`, await tokenHeader())
        return res.data
    },
    async favouriteActuator(deviceId, actuatorId) {
        const res = await axios.post(`${config.API_URL}/Devices/${deviceId}/Favourites`, { type: "actuator", objectId: actuatorId }, await tokenHeader())
        return res.data
    },
    async favouriteSensor(deviceId, sensorId) {
        const res = await axios.post(`${config.API_URL}/Devices/${deviceId}/Favourites`, { type: "sensor", objectId: sensorId }, await tokenHeader())
        return res.data
    },
    async unFavourite(deviceId, objectId) {
        const res = await axios.delete(`${config.API_URL}/Devices/${deviceId}/Favourites/${objectId}`, await tokenHeader())
        return res.data
    }
}