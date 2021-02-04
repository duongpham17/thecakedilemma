const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Gift = require('../models/giftModel');

const {sendOrderEmail, sendOrderAlertEmail, EmailOrderIsReady, sendGiftCardToBuyerEmail, sendGiftCardToRecipientEmail}= require('../util/Email');
const {appError, catchAsync} = require('../util/CatchError');
const Feature = require('../util/Feature');

const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const {v4 : uuidv4} = require("uuid");
const stripe = require('stripe')(process.env.NODE_ENV === "production" ? process.env.STRIPE_KEY_LIVE : process.env.STRIPE_KEY_DEV)

const stripe2 = require('stripe')(process.env.STRIPE_KEY_DEV)

//checkout
exports.checkout = catchAsync(async(req, res, next) => {
    const {token, orderData} = req.body; 

    const idempotency_Key  = uuidv4();

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    })

    const charge = await stripe.charges.create(
        {
            amount: orderData.discount ? Math.round(orderData.total_with_discount * 100) : Math.round(orderData.total * 100),
            currency: "gbp",
            customer: customer.id,
            receipt_email: token.email,
            description: orderData.user,
        },
        {
            idempotencyKey: idempotency_Key 
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

    //increase loyalty points
    if(req.body.user !== "guest"){
        const user = await User.findById(req.body.user)
        user.loyalty_point += 1
        await user.save()
    }

    //set stats for amount sold and total
    let productIDs = [];
    order.order.map(el => productIDs.push({id: el.id, total: el.total, quantity: el.quantity}))
    
    let i;
    for(i = 0; i < productIDs.length; i++){
        await Product.findByIdAndUpdate(productIDs[i].id, {$inc: {sold: productIDs[i].quantity, total: productIDs[i].total} })
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

    if(req.params.type === "Delivery"){
        try{
            await EmailOrderIsReady({
                email: order.email,
                subject: "Order Dispatched",
                title: "Order has been shipped.",
                id: order.id,
                message: "Your order has been posted via Royal Mail 1st Class. This service aims to deliver your parcel within 1-2 days. Please ensure someone is available to accept the parcel as it is not letterbox friendly.",
            })
            res.status(200).json({
                status: "success",
                order
            })
        } catch(err){
            return next(new appError("There was an error sending the email", 500))
        }
    } else {
        try{
            await EmailOrderIsReady({
                email: order.email,
                subject: "Order Is Ready",
                title: "Order is ready to collect",
                id: order.id,
                message: "Please contact us to confirm your collection time to ensure contactless and safe collection.",
            })
            res.status(200).json({
                status: "success",
                order
            })
        } catch(err){
            return next(new appError("There was an error sending the email", 500))
        }
    }
})

/* GIFT Card */

//create gift card checkout session
exports.createGiftCardSession = catchAsync(async(req, res, next) => {
    //get the data to fill out the gift card
    const {data} = req.body;

    //create checkout session
    const session = await stripe2.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${process.env.NODE_ENV === "production" ? "https://www.thecakedilemma.com" : "http://localhost:3000"}/gift-success`,
        cancel_url: `${process.env.NODE_ENV === "production" ? "https://www.thecakedilemma.com" : "http://localhost:3000"}/gift-cards`,
        customer_email: data.buyer_email,
        line_items: [
            {
                name: "Gift Card",
                images: ['https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572'],
                amount: data.balance * 100,
                currency: "gbp",
                quantity: 1,
            },
        ],
        metadata: data
    })

    //create session as response
    res.status(200).json({
        status: "success",
        session
    })
})

//making sure the payment have been scompleted
exports.webhookCheckoutGiftCard = async(req, res, next) => {
    const signature = req.headers['stripe-signature'];

    let event;

    try{
        event = stripe2.webhooks.constructEvent(req.body, signature, process.env.WEBHOOK_SECRET_GIFT_CARD);
    } catch(err){
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const intent = event.data.object
            await Gift.create({balance: intent.metadata.balance / 100})
            break;
        default:
            return res.status(400).send(`Webhook Error: ${event.type}`)
    }

    res.status(200).json({received: true})
}

/*

//create a gift card
exports.createGiftCard = catchAsync(async(req, res, next) => {
    const gift = await Gift.create(req.body);

    if(!gift){
        return next (new appError("Something went wrong. Please try again.", 400))
    }

    try{
        await sendGiftCardToBuyerEmail({
            data: gift,
            email: req.body.buyer_email,
            name: req.body.name
        });

        await sendGiftCardToRecipientEmail({
            data: gift,
            email: req.body.recipient_email,
            name: req.body.name
        });

        res.status(200).json({
            status: "success",
            gift
        })
    } catch (err){
        return next(new appError("There was an error sending the email", 500))
    }
})

*/