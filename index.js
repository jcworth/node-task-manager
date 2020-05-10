const dotenv = require('dotenv');
const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000

app.listen(3000, () => {
    console.log('Listening on port: ' + port);
});

app.get('/', (req, res) => {
    res.send('Hello World')
})