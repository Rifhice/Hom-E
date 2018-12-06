const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis')(process.env.REDIS_URL);


redisAdapter.pubClient.on('error', (error) => logger.info(error));
redisAdapter.pubClient.on('connect', () => logger.info("Connected to Redis"));
let io = null

module.exports = {
    listen: (server) => {
        try {
            io = socketio(server);
            io.adapter(redisAdapter);
            io.on('connection', (socket) => {
                logger.info("A client is connected ( id: " + socket.id + " )")
                socket.on("error", (error) => {
                    socketLog(error)
                })
            });
            return Promise.resolve()
        } catch (error) {
            logger.error(error)
            return Promise.reject()
        }
    }
}