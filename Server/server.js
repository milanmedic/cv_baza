const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const body_parser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const app = express()

require('./config/passport');
mongoose.Promise = global.Promise;
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json())
app.use(cors())

app.listen(config.PORT, () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(config.MONGODB_URI) //connecting to mongoose
})

const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => { //it wil start when the app loads
    require('./routes/companies')(app) //we require the routes we need and pass on the server
    require('./routes/students')(app)
    console.log(`Server started on: ${config.PORT}`)
})