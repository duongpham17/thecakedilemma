const Product = require('../models/productModel');
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

    const product = await prod.query.select(["title", "image", "price", "quantity"])

    res.status(200).json({
        status: "success",
        length: product.length,
        product
    })
})

//get choosen product
exports.getProduct = catchAsync(async(req, res, next) => {
    //only find active products
    const product = await Product.findOne({title: req.params.title})

    if(!product){
        return next (new appError("Product does not exist", 4000))
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