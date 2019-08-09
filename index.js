const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/db');
const userController = require('./controllers/userControllers');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user', userController);

var server = app.listen(4000, () => {
    console.log("App listen to port " + server.address().port)
})