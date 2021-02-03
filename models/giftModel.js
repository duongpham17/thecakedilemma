const mongoose = require('mongoose');
const crypto = require('crypto');

const giftSchema = new mongoose.Schema({
    balance: Number,
    code: {
        type: String,
        default: crypto.randomBytes(20).toString('hex').substring(0, 16).toUpperCase()
    },
    expiry: {
        type: Date,
        default: Date.now() + (60 * 24 * 60 * 60 * 1000)
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Gift = mongoose.model('Gift', giftSchema)

module.exports = Gift
