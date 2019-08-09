const mongoose = require('mongoose');

const mongodb_url = "mongodb+srv://kolimayurs:29031991@cluster0-onizc.mongodb.net/myDB";
mongoose.connect(mongodb_url, { useNewUrlParser: true });

module.exports = { mongoose };