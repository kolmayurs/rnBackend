
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/db');
const userController = require('./controllers/userControllers');
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user', userController);

var port=Number(process.env.PORT || 4001);
app.listen(port, () => {
	console.log('Product server listing from port ' + port);
})

