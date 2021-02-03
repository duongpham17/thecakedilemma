const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: String,

    email: String,
    first_name: String,
    last_name: String,
    address_1: String,
    address_2: String,
    city: String,
    postcode: String,

    method: String,
    postage: String,
    order:[],

    total_before_postage: Number,
    total: Number,
    total_with_discount: Number,

    discount:{ 
        type: Boolean, 
        default: false
    },
    discount_value: Number,

    message: String,

    status: { 
        type: String, 
        default: "Processing" 
    },
    date: String,
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
