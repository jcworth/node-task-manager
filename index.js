const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000
const passport = require('passport');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Mongoose connection
const url = process.env.MONGO_URL
mongoose.connect(url, { useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (err) => {
    console.log('Mongo connection error: ' + err);
})
db.once('open', () => {
    console.log('MongoDB connected: ' + url);
})

// Mongoose - create user secret details model
const Schema = mognoose.Schema;
const UserPass = new Schema({
    username: String,
    password: String
}) 

UserPass.plugin(passportLocalMongoose);
const userInfo = mongoose.model('userInfo', UserPass, 'userInfo')

// Routing
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.listen(port, () => {
    console.log('Listening on port: ' + port);
});
