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
    postage: Number,

    order:[{
        id: String,
        quantity: Number,
        price: Number,
        title: String,
        flavour: String,
        size: String,
        total: Number
    }],

    original_total: Number,

    discount:{ 
        type: Boolean, 
        default: false
    },
    discount_value: Number,

    gift_card: {
        type: Boolean,
        default: false
    },
    gift_card_code: String,
    gift_card_value: Number,

    grand_total: Number,

    message: String,

    status: { 
        type: String, 
        default: "Processing" 
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
