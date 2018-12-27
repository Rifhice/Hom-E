import io from 'socket.io-client';

const socket = io("http://192.168.1.81:5000")

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