
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
    },
    height:{
        type: Number,
        required: true
    },
    sportsList: [{
        sport_name: {
            type: String
        },
        duration:{
            type: Number
        },
        burnt_calories:{
            type: Number
        }, 
        date : {
            type: String,
            default : Date.now
        }
    }],
    weight_evolution:[{
        weight:{
            type: String
        },
        date:{
            type: String,
            default : Date.now
        }
    }],
    sleepingHours:[{
        hours:{
            type:Number,
            required: true
        },
        date:{
            type:String,
            default: Date.now
        }
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;