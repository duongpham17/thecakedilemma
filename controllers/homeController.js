const {Feed, Image, Question} = require('../models/homeModel');
const Product = require('../models/productModel');
const {appError, catchAsync} = require('../util/CatchError');

//create feed
exports.createFeed = catchAsync(async(req, res, next) => {
    const feed = await Feed.create(req.body)

    if(!feed){
        return next (new appError("Could not create feed", 400))
    }

    res.status(200).json({
        status: "success",
        feed
    })
})

//get feed
exports.getFeed = catchAsync(async(req, res, next) => {
    const feed = await Feed.find().sort({createdAt: -1})

    if(!feed){
        return next (new appError("No feed was found", 400))
    }
    
    res.status(200).json({
        status: "success",
        feed
    })
})

//delete feed
exports.deleteFeed = catchAsync(async(req, res, next) => {
    const feed = await Feed.findByIdAndDelete(req.params.id)

    if(!feed){
        return next (new appError("No product with that ID", 400))
    }

    res.status(200).json({
        status: "success"
    })
})


/* upload Image */

//get Images 
exports.getImages = catchAsync(async(req, res, next) => {
    const image = await Image.find().sort({createdAt: -1})

    if(!image){
        return next (new appError("No feed was found", 400))
    }
    
    res.status(200).json({
        status: "success",
        image
    })
})

//upload image
exports.uploadImage = catchAsync(async(req, res, next) => {

    const image = await Image.create({url: req.body.url})

    if(!image){
        return next(new appError('Upload failed. Try again.', 400))
    }

    res.status(200).json({
        status: 'success',
        image
    })
})

//delete image
exports.deleteImage = catchAsync(async( req, res, next) => {
    const image = await Image.findByIdAndDelete(req.params.id)

    if(!image){
        return next (new appError("No product with that ID", 400))
    }

    res.status(200).json({
        status: "success"
    })
})

exports.getBestProducts = catchAsync(async(req, res, next) => {
    const product = await Product.find({best: "best"}).select(["title", "image", "price", "best"])

    if(!product){
        return next (new appError("No best product found", 400))
    }
    res.status(200).json({
        status: "success",
        product
    })
})

/* Frequently asked questions */

//get questions
exports.getQuestions = catchAsync(async(req, res, next) => {
    const question = await Question.find()

    if(!question){
        return next (new appError("No question found", 400))
    }
    
    res.status(200).json({
        status: "success",
        question
    })
})

//create questions
exports.createQuestion = catchAsync(async(req, res, next) => {
    const question = await Question.create(req.body)

    if(!question){
        return next (new appError("No question found", 400))
    }

    res.status(200).json({
        status: "success",
        question
    })
})

//delete questions
exports.deleteQuestion = catchAsync(async( req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id)

    if(!question){
        return next (new appError("No question with that ID", 400))
    }

    res.status(200).json({
        status: "success"
    })
})
