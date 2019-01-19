import { connect } from 'react-redux';
import UserService from '../InternalServices/UserServices';
import newDevice from '../screens/NewDevice';

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