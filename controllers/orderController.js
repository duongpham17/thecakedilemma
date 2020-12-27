const Order = require('../models/orderModel');
const User = require('../models/userModel');
const {sendOrderEmail, sendOrderAlertEmail}= require('../util/Email');
const {appError, catchAsync} = require('../util/CatchError');
const Feature = require('../util/Feature');
const {v4 : uuidv4} = require("uuid");
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_KEY);

//checkout
exports.checkout = catchAsync(async(req, res, next) => {
    const {token, orderData} = req.body; 

    const idempotency_Key  = uuidv4();

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    }, {
        idempotencyKey: idempotency_Key 
    })

    const charge = await stripe.charges.create(
        {
            amount: orderData.discount ? orderData.total_with_discount * 100 : orderData.total * 100,
            currency: "gbp",
            customer: customer.id,
            receipt_email: token.email,
            description: orderData.user,
        }
    );

    if(!charge){
        return next(new appError("something went wrong", 400))
    }

    res.status(200).json({status: "success"})
})

//create an order once payment is successful,
exports.createOrder = catchAsync(async(req, res, next) => {
    const order = await Order.create(req.body)

    if(req.body.user !== "guest"){
        const user = await User.findById(req.body.user)
        user.loyalty_point += 1
        await user.save()
    }

    if(!order){
        return next(new appError("Could not create an order.", 400))
    }

    try{
        await sendOrderEmail({
            email: order.email,
            data: order
        });

        await sendOrderAlertEmail({
            data: order
        });

        res.status(200).json({
            status: "success",
            message: 'Confirmation sent'
        })
    } catch (err){
        return next(new appError("There was an error sending the email", 500))
    }
})

//get receipt for user
exports.getOrders = catchAsync(async(req, res, next) => {
    const ord = new Feature(Order.find({user: req.user.id}), req.query).sort().pagination()
    const order = await ord.query

    if(!order){
        return next (new appError("Could not find any receipt", 400))
    }

    res.status(200).json({
        status: "success",
        length: order.length,
        order
    })
})

//get admin orders
exports.getAdminOrders = catchAsync(async(req, res, next) => {
    const ord = new Feature(Order.find(), req.query).sort().pagination()
    const order = await ord.query;

    if(!order){
        return next (new appError("Could not find any receipt", 400))
    };

    res.status(200).json({
        status: "success",
        length: order.length,
        order
    })
})

//complete orders
exports.completeOrder = catchAsync(async(req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {status: "Completed"})

    if(!order){
        return next (new appError("Could not find any receipt", 400))
    };

    res.status(200).json({
        status: "success",
        order
    })
})
