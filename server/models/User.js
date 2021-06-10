const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const md5 = require('md5');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({ 
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email address'],
        required: 'Please enter an email address',
    },
    name: {
        type: String,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    age: {
        type: Number
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }

});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);


