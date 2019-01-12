import { connect } from 'react-redux';
import newDevice from '../screens/NewDevice';
import actions from '../redux/actions/user.actions'
import UserService from '../InternalServices/UserServices'

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.user._id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async removeToken(userId) {
            try {
                return await UserService.logout(userId, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        }
    }
}

const component = connect(
    mapStateToProps,
    mapDispatchToProps
)(newDevice)


export default component;