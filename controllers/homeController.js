const Home = require('../models/homeModel');
const {appError, catchAsync} = require('../util/CatchError');

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

exports.deleteFeed = catchAsync(async( req, res, next) => {
    const home = await Home.findByIdAndDelete(req.params.id)

    if(!home){
        return next (new appError("No product with that ID", 400))
    }

    res.status(200).json({
        status: "success"
    })
})