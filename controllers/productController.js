const Product = require('../models/productModel');
const Review = require('../models/reviewModel');
const Variety = require('../models/varietyModel');
const {appError, catchAsync} = require('../util/CatchError');
const Feature = require('../util/Feature');

//Auto load variety box that is set to active on load
exports.varietyBox = catchAsync(async(req, res, next) => {
    const variety = await Variety.find({active: true})

    if(!variety){
        return next (new appError("Something went wrong", 400))
    }

    res.status(200).json({
        status: "success",
        variety
    })
})

//product middleware
exports.getProducts = catchAsync(async(req, res, next) => {
    //only find active products
    const prod = new Feature(Product.find({active: true}), req.query).sort().pagination().filter()

    const product = await prod.query.select(["title", "image", "sortPrice", "quantity", "price"])

    if(!product){
        return next(new appError("Could not find any product"))
    }

    res.status(200).json({
        status: "success",
        length: product.length,
        product
    })
})

//get choosen product
exports.getOneProduct= catchAsync(async(req, res, next) => {
    //only find active products
    const product = await Product.findOne({title: req.params.title})

    if(!product){
        return next (new appError("Product does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//update quantity
exports.updateQuantity = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(req.params.sign === "minus"){
        product.quantity = product.quantity - req.body.quantity;
    } else {
        product.quantity = product.quantity + req.body.quantity;
    }

    await product.save();

    if(!product){
        return next (new appError("Could not add to basket", 401))
    };

    res.status(200).json({
        status: "success",
        product
    })
})

//get reviews for product
exports.getReviews = catchAsync(async(req, res, next) => {
    const rev = new Feature (Review.find({product: req.params.id}), req.query).sort({createdAt: -1}).pagination()

    const review = await rev.query

    const reviewLength = await Review.find()

    let reviewed;
    if(req.params.user !== "guest"){
        reviewed = await Review.find({user: req.params.user})
        reviewed = reviewed.length >= 1
    }

    if(!review){
        return next(new appError("Could not create review"))
    }

    res.status(200).json({
        status: "success",
        review,
        reviewed,
        reviewLength: reviewLength.length
    })
})

//create review 
exports.createReview = catchAsync(async(req, res, next) => {
    const {name, rating, product, description} = req.body

    const review = await Review.create({user: req.user.id, name, rating, product, description})

    if(!review){
        return next(new appError("Could not create review"))
    }

    res.status(200).json({
        status: "success",
        review
    })
})

//delete review
exports.deleteReview = catchAsync(async(req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id)

    if(!review){
        return next(new appError("Could not delete review"))
    }

    res.status(200).json({
        status: "success",
    })
})