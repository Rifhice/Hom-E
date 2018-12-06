import io from 'socket.io-client';

const socket = io(process.env.SOCKET_URL)

socket.on("error", (error) => {
    console.log(error)
})

export default {
    subscribe(boardId) {
        socket.emit("subscribeBoard", boardId)
    },
    unsubscribe(boardId) {
        socket.emit("unsubscribeBoard", boardId)
    },
    init(store) {
        socket.on("action", (action) =>
            store.dispatch(action)
        )
        socket.on("connect", () => {
            console.log("Connected !")
        })
    },
    emit(type, payload) {
        socket.emit(type, payload)
    }
}