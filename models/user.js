const mongoose = require('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pinCode:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        default:Date.now

    },
    
})

module.exports = mongoose.model('User', UserSchema)



