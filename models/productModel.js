const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    ratingsAverage: {
        type: Number,
        default: 5,
        max: [5, "Rating must be below 5"],
        set: val => Math.round(val * 10 ) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
    },
    title:{
        type: String,
    },
    size: {
        type: String,
    },
    flavour: {
        type: String,
    },
    optPrice: {
        type: String,
    },
    price:{
        type: String,
    },
    sortPrice:{
        type: Number
    },
    quantity:{
        type: Number,
        default: 0
    },
    minimum:{
        type: Number,
        default: 0
    },
    description:{
        type: String,
        trim: true,
        default: "",
    },
    deliveryMessage: {
        type: String,
        default: "delivery message empty"
    },
    image:[{
        url: String,
    }],
    allergen:{
        type: String,
        default: "Gluten, Egg, Nut, Peanut, Soy, Sesame, Dairy"
    },
    ingredient:{
        type: String,
    },
    active:{
        type: Boolean,
        default: false
    },
    best: {
        type: String,
        default: "none"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
},
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product

//keeping a reference to all the child documents on the parent document
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
})
