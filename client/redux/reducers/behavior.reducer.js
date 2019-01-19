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
        default:
            return state
    }
}