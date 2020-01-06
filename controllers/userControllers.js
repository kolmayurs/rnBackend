const express = require('express');
const router = express.Router();

const User = require('../models/user');
const authenticate = require('../middlewares/authenticate');

router.get('/user', authenticate, (req, res) => {
    res.send(req.user);
});

router.post('/create', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    const user = new User(userData);

    user.save().then((user) => {
        if (user) {
            return user.generateAuthToken();
        } else {
            res.sendStatus(400);
        }
    }).then((token) => {
        res.header({ 'x-auth': token }).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.post('/login', (req, res) => {
    User.findUserByCredentials(req.body.email, req.body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header({ 'x-auth': token }).send(user);
        })
    });
});

router.delete('/logout', authenticate, (req, res) => {
    req.user.removeToken().then(() => {
        res.status(200).send("User Logged Out");
    }).catch(() => {
        res.status(401).send();
    })
});
module.exports = router;