import io from 'socket.io-client';

const socket = io("http://192.168.1.66:5000")

socket.on("error", (error) => {
    console.log(error)
})

socket.on("connect", () => {
    console.log("Connected !")
})

export default {
    subscribe(deviceId) {
        socket.emit("subscribeClientTODevice", deviceId)
    },
    unsubscribe(deviceId) {
        socket.emit("unsubscribeClientFromDevice", deviceId)
    },
    init(store) {
        console.log("Init")
        socket.on("action", (action) =>
            store.dispatch(action)
        )
    },
    emit(type, payload) {
        socket.emit(type, payload)
    }
}