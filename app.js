const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

const app = express();
const PORT = config.get('port') || 5000;

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "POST, GET, PUT, DELETE");
    next();
})

//registration of routes
app.use('/', userRoutes);


// connect mongoDB and start app
async function start() {
    const PATH = config.get('mongoUri');

    try {
        await mongoose.connect(PATH, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB is successfully connected`);
        app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}
start();