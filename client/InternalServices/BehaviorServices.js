import BehaviorWebService from '../WebServices/BehaviorWebService'
import actions from '../redux/actions/behavior.actions'

export default {
    async getBehaviors(deviceId, dispatch) {
        const result = await BehaviorWebService.getBehaviors(deviceId)
        dispatch({ type: actions.FETCHED_BEHAVIORS, payload: result })
        return result
    }
}