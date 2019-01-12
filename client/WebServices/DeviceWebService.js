import axios from 'axios'
import config from '../config'
import { tokenHeader } from '../helper/HeaderHelper'
export default {
    async getDeviceUsers(deviceId) {
        const res = await axios.get(`${config.API_URL}/Devices/${deviceId}/Users`, await tokenHeader())
        return res.data
    },
    async updateUserRank(deviceId, userId, newRank) {
        const res = await axios.put(`${config.API_URL}/Devices/${deviceId}/Users/${userId}/Rank`, { newRank }, await tokenHeader())
        return res.data
    },
    async addUser(deviceId, userId) {
        const res = await axios.post(`${config.API_URL}/Devices/${deviceId}/Users`, { userId }, await tokenHeader())
        return res.data
    },
    async removeUser(deviceId, userId) {
        const res = await axios.delete(`${config.API_URL}/Devices/${deviceId}/Users/${userId}`, await tokenHeader())
        return res.data
    },
    async getAllPossibleRestrictions(deviceId) {
        const res = await axios.get(`${config.API_URL}/Devices/${deviceId}/Restrictions`, await tokenHeader())
        return res.data
    },
    async addRestriction(deviceId, userId, restriction) {
        const res = await axios.post(`${config.API_URL}/Devices/${deviceId}/Users/${userId}/Restrictions`, { restriction }, await tokenHeader())
        return res.data
    },
    async removeRestriction(deviceId, userId, restrictionId) {
        const res = await axios.delete(`${config.API_URL}/Devices/${deviceId}/Users/${userId}/Restrictions/${restrictionId}`, await tokenHeader())
        return res.data
    }
}