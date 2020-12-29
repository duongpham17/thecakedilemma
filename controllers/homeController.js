const {Home, Image} = require('../models/homeModel');
const Product = require('../models/productModel');
const {appError, catchAsync} = require('../util/CatchError');

//create feed
exports.createFeed = catchAsync(async(req, res, next) => {
    const home = await Home.create(req.body)

    if(!home){
        return next (new appError("Could not create feed", 400))
    }

    res.status(200).json({
        status: "success",
        home
    })
})

//get feed
exports.getFeed = catchAsync(async(req, res, next) => {
    const home = await Home.find().sort({createdAt: -1})

    if(!home){
        return next (new appError("No feed was found", 400))
    }
    
    res.status(200).json({
        status: "success",
        home
    })
})

//delete feed
exports.deleteFeed = catchAsync(async( req, res, next) => {
    const home = await Home.findByIdAndDelete(req.params.id)

    if(!home){
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