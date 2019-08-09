const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        minlength: 4
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 4
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
/*userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    return _.pick(userObject, ["_id", "email", "name"]);
}*/

userSchema.pre("save", function(next) {
    const user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.generateAuthToken = function() {
    const user = this;
    const access = "auth";

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ _id: user._id.toHexString(), access }, 'shfjksdh').toString();

    user.tokens.push({ access, token });
    return user.save().then(() => {
        return token;
    })
}

userSchema.statics.findUserByCredentials = function(email, password) {
    const User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) {
            Promise.reject();
        } else {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        resolve(user);
                    } else {
                        reject();
                    }
                })
            })
        }
    })
}

userSchema.statics.findUserByToken = function(token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, 'shfjksdh')
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        "_id": decoded._id,
        "tokens.token": token,
        "tokens.access": "auth",
    });
}


userSchema.methods.removeToken = function(token) {
    const user = this;

    return user.updateOne({
        $pull: {
            tokens: { token }
        }
    });
}

const User = mongoose.model('UserDB', userSchema);

module.exports = User;