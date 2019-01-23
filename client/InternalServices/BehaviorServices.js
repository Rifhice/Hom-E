import BehaviorWebService from '../WebServices/BehaviorWebService'
import actions from '../redux/actions/behavior.actions'

export default {
    async getBehaviors(deviceId, dispatch) {
        const result = await BehaviorWebService.getBehaviors(deviceId)
        dispatch({ type: actions.FETCHED_BEHAVIORS, payload: result })
        return result
    },
    async addBehavior(deviceId, behavior, dispatch) {
        const result = await BehaviorWebService.addBehavior(deviceId, behavior)
        return result
    },
    async deleteBehavior(deviceId, behaviorId, dispatch) {
        const result = await BehaviorWebService.deleteBehavior(deviceId, behaviorId)
        return result
    }
}