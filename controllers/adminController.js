const Product = require('../models/productModel');
const {Data} = require('../models/homeModel');
const Review = require('../models/reviewModel');
const Variety = require('../models/varietyModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

const {appError, catchAsync} = require('../util/CatchError');

// update settings for data
exports.updateData = catchAsync(async(req, res, next) => {
    const data = await Data.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!data){
        return next (new appError("Could not update data", 400))
    }

    res.status(200).json({
        status: "success",
        data
    })
})

//get product product 
exports.getProducts = catchAsync(async(req, res, next) => {
    const product = await Product.find().sort({createdAt: -1})

    if(!product){
        return next (new appError("Could not find any products", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//create product
exports.createProduct = catchAsync(async(req, res, next) => {

    const product = await Product.create(req.body)

    if(!product){
        return next (new appError("Could not create product", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//activate or deactivate product to show to users
exports.activateProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {active: req.params.boolean, best: "none"}, {new: true})

    if(!product){
        return next (new appError("Could change active of product", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//delete product
exports.deleteProduct = catchAsync(async(req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id)

    await Review.deleteMany({"product": req.params.id})

    if(!product){
        return next (new appError("Could not delete product", 400))
    }
    
    res.status(200).json({
        status: "success",
        product
    })
})

/* Edit Products ************************************************************************/

//get product to edit
exports.getProductToEdit = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return next (new appError("No product found with that ID", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//update product
exports.updateProduct = catchAsync(async(req, res, next) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})

    if(!product){
        return next (new appError("Could not update product", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//upload images
exports.uploadImage = catchAsync(async(req, res, next) => {

    const product = await Product.findById(req.params.id)

    if(!product ){
        return next(new appError('Upload failed. Try again.', 400))
    }

    product.image.push({url: req.body.url})

    await product.save()

    res.status(200).json({
        status: 'success',
        product
    })
})

//delete images
exports.deleteImage = catchAsync(async(req, res, next) => {
    //find product
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new appError('Product does not exist', 400))
    }

    const index = product.image.indexOf(product.image.find(img => img.id === req.params.image_id))

    product.image.splice(index, 1)

    await product.save();

    res.status(200).json({
        status: 'success',
        product
    })
})


/* Varieties ************************************************************************/

//get variety boxes
exports.getVarieties = catchAsync(async(req, res, next) => {
    const variety = await Variety.find()

    if(!variety){
        return next (new appError("Could find any variety box", 400))
    }

    res.status(200).json({
        status: "success",
        variety
    })
})

//create variety box
exports.createVariety = catchAsync(async(req, res, next) => {
    const variety = await Variety.create({
        user:req.user.id,
        title: req.body.title
    })

    if(!variety){
        return next (new appError("Could not create variety box", 400))
    }

    res.status(200).json({
        status: "success",
        variety
    })
})

//add product to variety
exports.addProductToVariety = catchAsync(async(req, res, next) => {

    const {price, name} = req.body

    const variety = await Variety.findById(req.params.id)

    if(!variety){
        return next (new appError("Could not add to variety box", 400))
    }

    variety.variety.push({price, name})

    await variety.save()
    
    res.status(200).json({
        status: "success",
        variety
    })
})

//update variety box based on specific array[index]
exports.updateProductInVariety = catchAsync(async(req, res, next) => {
    //first find the variety box
    const variety = await Variety.findById(req.params.id)
        
    if(!variety){
        return next (new appError("Could not update item", 400))
    }

    //find the entire array id and put it into an array
    const array = req.body.array;
    //get all the name / price and convert it into an array
    const name = req.body.name;
    const price = req.body.price;

    //loop through and match the corresponding index with the name and price based on array id
    let i;
    for (i = 0 ; i < array.length ; i++ ){
        const index = variety.variety.findIndex(el => el.id == array[i])
        variety.variety[index].name = name[index]
        variety.variety[index].price = price[index]
    }   

    //once the loops is done save the document.
    await variety.save()
    
    res.status(200).json({
        status: "success",
        variety
    })
})

//delete items inside variety box 
exports.deleteItemInVarietyBox = catchAsync(async(req, res, next) => {
    const variety = await Variety.findById(req.params.id)

    if(!variety){
        return next (new appError("Variety item could not be found", 400))
    }
    
    const index = variety.variety.findIndex(el => el.id === req.params.itemId)

    variety.variety.splice(index, 1)

    await variety.save()

    res.status(200).json({
        status: "success",
        variety
    })
})

//delete the variety box
exports.deleteVarietyBox = catchAsync(async(req, res, next) => {

    const variety = await Variety.findByIdAndDelete(req.params.id)

    if(!variety){
        return next (new appError("Could not find variety box ID", 400))
    }

    res.status(200).json({
        status: "success",
        variety
    })
})

//set active to true
exports.setVarietyActive = catchAsync(async(req, res, next) => {
    //first get back the length of active
    const active = await Variety.find({active: true})
    //second find document, if false then make sure any active is set to false
    const variety = await Variety.findById(req.params.id)

    if(active.length >= 1 && variety.active === false) {
        return next (new appError("Only one active at a time", 400))
    }

    await Variety.findByIdAndUpdate(req.params.id, {active: req.params.boolean}, {new: true})

    res.status(200).json({
        status: "success",
        variety
    })
})

/* Find Order ************************************************************************/
exports.findOrder = catchAsync(async(req, res, next) => {
    let order;

    if(req.params.type === "id"){
        order = await Order.findById(req.params.id)
    } else {
        order = await Order.findOne({email: req.params.id}).sort({createdAt : -1})
    }

    if(!order){
        return next (new appError("No order with that ID", 400))
    }

    res.status(200).json({
        status: "success",
        order
    })
})

/* Stats ************************************************************************/
exports.findStats = catchAsync(async(req, res, next) => {
    const stats = await User.find().select(['loyalty_point', 'email']).limit(101).sort({loyalty_point: -1})

    if(!stats){
        return next (new appError("Could not find any stats", 400))
    }

    res.status(200).json({
        status: "success",
        stats
    })
})