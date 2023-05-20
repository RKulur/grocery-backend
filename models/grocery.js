const mongoose = require('mongoose')
const {Schema} = mongoose;

const GrocerySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'On stock'
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('Grocery', GrocerySchema)



