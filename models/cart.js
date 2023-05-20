const mongoose = require('mongoose')
const {Schema} = mongoose;

const CartSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    groceryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'grocery'
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('Cart', CartSchema)



