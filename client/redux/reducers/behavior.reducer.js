import actions from '../actions/behavior.actions'

const defaultState = {
    all: []
};

export default (state = defaultState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case actions.FETCHED_BEHAVIORS:
            return {
                all: action.payload
            }
        case actions.ADD_BEHAVIOR:
            return {
                all: [...state.all, action.payload.behavior]
            }
        case actions.REMOVE_BEHAVIOR:
            return {
                all: state.all.filter(behavior => behavior._id === action.payload._id)
            }
        default:
            return state
    }
}