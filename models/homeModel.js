const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
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

const questionSchema = new mongoose.Schema({
    title: {
        type : String,
    },
    description: {
        type: String,
    }

})

const Feed = mongoose.model('Feed', feedSchema)
const Image = mongoose.model('Image', imageSchema)
const Question = mongoose.model('Question', questionSchema)

module.exports = {Feed, Image, Question}