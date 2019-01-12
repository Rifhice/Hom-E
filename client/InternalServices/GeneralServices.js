import GeneralWebServices from '../WebServices/GeneralWebServices'

export default {
    async getUserByUsername(query) {
        return await GeneralWebServices.getUserByUsername(query)
    }
}