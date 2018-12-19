import io from 'socket.io-client';

const socket = io("http://192.168.0.18:5000")

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
        this.subscribe("5bf6962756d95f001c853c1a")
        socket.on("event", event =>
            store.dispatch(event)
        )
    },
    emit(type, payload) {
        socket.emit(type, payload)
    }
}