import actions from '../actions/device.actions'

const defaultState = {
    users: [],
    masterUser: {}
};

export default (state = defaultState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case actions.FETCHED_DEVICE_USERS:
            return action.payload
        default:
            return state
    }
}