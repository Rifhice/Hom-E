require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// Connect to Mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})

mongoose.connection.once('open', function () {
    console.log('Connected to mongoDB')
    require('./models')
}).on('error', function (error) {
    console.log('Connection error:', error)
})