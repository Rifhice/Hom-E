import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import socketIO from '../SocketService'

export default function configureStore(initialState = {}) {
    const store = createStore(
        rootReducer, compose(
            applyMiddleware(thunk)
        ));
    socketIO.init(store)
    return store
}