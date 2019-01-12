import io from 'socket.io-client';
import conf from './config'

const socket = io(conf.SOCKET_URL)

socket.on("error", (error) => {
    console.log(error)
})

socket.on("connect", () => {
    console.log("Connected !")
})

export default {
    subscribe(deviceId) {
        socket.emit("subscribeClientToDevice", deviceId)
    },
    unsubscribe(deviceId) {
        socket.emit("unsubscribeClientFromDevice", deviceId)
    },
    connectToSocket(userId) {
        console.log("Connecting user to socket!")
        socket.emit("userConnecting", userId)
    },
    disconnectToSocket(userId) {
        console.log("Connecting user to socket!")
        socket.emit("userDisconnecting", userId)
    },
    init(store) {
        socket.on("event", event => {
            console.log(event)
            store.dispatch(event)
        })
    },
    emit(type, payload) {
        socket.emit(type, payload)
    }
}