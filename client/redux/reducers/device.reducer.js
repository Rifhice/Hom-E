import actions from '../actions/device.actions'

const defaultState = {
    users: [],
    masterUser: {}
};

export default (state = defaultState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case actions.FETCHED_DEVICE_USERS:
            return action.payload
        case actions.UPDATE_USER_RANK:
            return {
                ...state,
                users: state.users.map(user => user.user._id === action.payload.user._id ? action.payload : user)
            }
        case actions.ADD_USER_TO_DEVICE:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case actions.REMOVE_USER_TO_DEVICE:
            return {
                ...state,
                users: state.users.filter(user => user.user._id !== action.payload._id)
            }
        case actions.ADD_RESTRICTION_TO_USER:
            return {
                ...state,
                users: state.users.map(user => user.user._id === action.payload.userId ? { ...user, restrictions: [...user.restrictions, action.payload.restriction] } : user)
            }
        case actions.REMOVE_RESTRICTION_TO_USER:
            return {
                ...state,
                users: state.users.map(user => user.user._id === action.payload.userId ? { ...user, restrictions: user.restrictions.filter(restriction => restriction._id !== action.payload.restrictionId) } : user)
            }
        default:
            return state
    }
}