import { connect } from 'react-redux';
import actions from '../redux/actions/user.actions';
import mainpage from '../screens/MainScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveToken(token) {
            return dispatch({ type: actions.SAVE_TOKEN, payload: { token } })
        }
    }
}

const component = connect(
    mapStateToProps,
    mapDispatchToProps
)(mainpage)


export default component;