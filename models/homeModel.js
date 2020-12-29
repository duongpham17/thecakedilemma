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

const imageSchema = new mongoose.Schema({
    url: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Home = mongoose.model('Home', homeSchema)
const Image = mongoose.model('Image', imageSchema)

module.exports = {Home, Image}