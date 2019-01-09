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
    init(store) {
        console.log("Init")
        socket.on("event", event => {
            console.log(event)
            store.dispatch(event)
        })
    },
    emit(type, payload) {
        socket.emit(type, payload)
    }
}