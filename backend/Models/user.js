
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    Password: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;