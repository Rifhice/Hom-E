import { connect } from 'react-redux';
import mainpage from '../screens/MainScreen';
import UserServices from '../InternalServices/UserServices'
import actions from '../redux/actions/user.actions';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
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