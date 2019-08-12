const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/db');
const userController = require('./controllers/userControllers');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user', userController);

var port=Number(process.env.PORT || 4000);
app.listen(port, () => {
	console.log('Product server listing from port ' + port);
})