const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    delivery: Number,
    minimumOrder: Number,
})

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

const Data = mongoose.model('Data', dataSchema)
const Feed = mongoose.model('Feed', feedSchema)
const Image = mongoose.model('Image', imageSchema)
const Question = mongoose.model('Question', questionSchema)

module.exports = {Feed, Image, Question, Data}