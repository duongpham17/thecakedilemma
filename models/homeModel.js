const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
    description: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Home = mongoose.model('Home', homeSchema)
module.exports = Home