import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import socketIO from '../SocketService'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export default function configureStore(initialState = {}) {
    const store = createStore(
        connectRouter(rootReducer), compose(
            applyMiddleware(thunk)
        ));
    socketIO.init(store)
    return store
}