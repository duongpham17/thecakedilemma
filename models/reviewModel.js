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
    review: {
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

//calculating ratingsAverage and ratingsQuantity using a STATIC method
reviewSchema.statics.calcAverageRatings = async function(productId){
    const stats = await this.aggregate([
        //first stage, select all reviews belonging to the current product
        {
            $match: {product: productId}
        },
        //second stage, calculate the statistics. NOTE: Always put _id first, _id means what documents have in common that we want to group by.
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

reviewSchema.index({product: 1, user: 1}, {unique: true});

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