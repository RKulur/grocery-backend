const mongoose = require('mongoose')
const {Schema} = mongoose;

const PaymentSchema = new Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    orderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'order'
    },
    total :{
        type : String,
        required : true,
    },
    paymentType : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Payment",PaymentSchema);