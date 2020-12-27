const mongoose = require('mongoose')

const varietySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title:{
        type: String
    },
    variety:[{
        price: {
            type: Number,
            default: 0
        },
        name: String
    }],
    active: {
        type: Boolean,
        default: false
    }
})

const Variety = mongoose.model('Variety', varietySchema)
module.exports = Variety