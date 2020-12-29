const mongoose = require('mongoose')
const Product = require('./productModel')

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must come from a user']
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: ['Review must be for a product']
    },
    name: {
        type: String
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Review can not be empty']
    },
    rating: {
        type: Number,
        max: 5,
        required: [true, 'Must have a rating between 1 - 5']
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

reviewSchema.statics.calcAverageRatings = async function(productId){
    const stats = await this.aggregate([
        {
            $match: {product: productId}
        },
        {
            $group: {
                _id: '$product',
                nRating: {$sum: 1},
                avgRating: {$avg: '$rating'},
            }
        },
    ]);
    
    if(stats.length > 0){
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: 0,
            ratingsAverage: 0
        });
    }
}

//reviewSchema.index({product: 1, user: 1}, {unique: true});

reviewSchema.post('save', function(){
    this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function(next){
    this.r = await this.findOne();
    next()
});

reviewSchema.post(/^findOneAnd/, async function(){
    await this.r.constructor.calcAverageRatings(this.r.product);
});

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review