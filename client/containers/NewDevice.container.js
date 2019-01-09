import { connect } from 'react-redux';
import newDevice from '../screens/NewDevice';
import actions from '../redux/actions/user.actions'

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        removeToken() {
            dispatch({ type: actions.REMOVE_TOKEN, payload: {} })
            dispatch({ type: actions.LOGOUT, payload: {} })
        }
    }
}

const component = connect(
    mapStateToProps,
    mapDispatchToProps
)(newDevice)


export default component;