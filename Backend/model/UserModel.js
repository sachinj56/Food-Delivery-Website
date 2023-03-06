const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel