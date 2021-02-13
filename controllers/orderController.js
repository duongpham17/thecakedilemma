const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Gift = require('../models/giftModel');

const crypto = require('crypto');

const {sendOrderEmail, sendOrderAlertEmail, EmailOrderIsReady, sendGiftCardToBuyerEmail, sendGiftCardToRecipientEmail}= require('../util/Email');
const {appError, catchAsync} = require('../util/CatchError');
const Feature = require('../util/Feature');

const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const {v4 : uuidv4} = require("uuid");
//for production
const stripe = require('stripe')(process.env.NODE_ENV === "production" ? process.env.STRIPE_KEY_LIVE : process.env.STRIPE_KEY_DEV)
//for development
const stripe2 = require('stripe')(process.env.STRIPE_KEY_DEV)

//create order checkout session
exports.createOrderCheckoutSession = catchAsync(async(req, res, next) => {
    //get the data to fill out the order 
    const {orderData} = req.body;

    const stringOrder = (data) => orderData.order.map(el => el[data]).join(",");

    //convert the array of orderData.order into a string.
    const orderItems = {
        order_ids: stringOrder("id"),
        order_title: stringOrder("title"), 
        order_flavour : stringOrder("flavour"),
        order_size: stringOrder("size"),
        order_price: stringOrder("price"),
        order_quantity: stringOrder("quantity"),
        order_total: stringOrder("total"),
    }

    //delete order from orderData
    delete orderData["order"];

    const newOrderData = Object.assign(orderData, orderItems)

    //create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${process.env.NODE_ENV === "production" ? "https://www.thecakedilemma.com" : "http://localhost:3000"}/order-success`,
        cancel_url: `${process.env.NODE_ENV === "production" ? "https://www.thecakedilemma.com" : "http://localhost:3000"}/checkout`,
        customer_email: orderData.buyer_email,
        expand: ['line_items'],
        line_items: [{
            name: "Orders",
            images: ['https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572'],
            amount: +(Math.round(orderData.grand_total * 100)).toFixed(2),
            currency: "gbp",
            quantity: 1,
        }],
        metadata: newOrderData
    })

    res.status(200).json({
        status: "success",
        session
    })
})

//making sure the payment have been scompleted
exports.webhookCheckoutOrder = async(req, res, next) => {
    //development webhook
    //const webhook = process.env.WEBHOOK_CHECKOUT_ORDER;

    //production webhook
    const webhook = process.env.WEBHOOK_CHECKOUT_ORDER_LIVE

    const signature = req.headers['stripe-signature'];

    let event;

    try{
        event = stripe.webhooks.constructEvent(req.body, signature, webhook);
    } catch(err){
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const intent = event.data.object.metadata;
            
            //convert the string orderItems back into an array of objects
            const orderItems = [];
            for(let i = 0; i < intent.order_ids.split(",").length; i++){
                orderItems.push({
                    id: intent.order_ids.split(",")[i],
                    title: intent.order_title.split(",")[i],
                    flavour: intent.order_flavour.split(",")[i],
                    size: intent.order_size.split(",")[i],
                    price: intent.order_price.split(",")[i],
                    quantity: intent.order_quantity.split(",")[i],
                    total: intent.order_total.split(",")[i],
                })
            }
            //then insert this new orderItems as order, the name given in order model schema
            intent.order = orderItems;

            //create order
            const order = await Order.create(intent);

            //increase loyalty points
            if(order.user !== "guest"){
                await User.findOneAndUpdate(order.user, {$inc: {loyalty_point: 1 }}, {new: true})
            }

            //decrease or delete gift card if it has been used
            if(order.gift_card){
                const gift = await Gift.findOne({code: order.gift_card_code})
                const value = gift.balance - order.gift_card_value;
                if(value <= 0 || gift.expiry < Date.now()){
                    await Gift.deleteOne({"code": order.gift_card_code})
                } else {
                    gift.balance -= order.gift_card_value;
                    await gift.save()
                }
            }

            //set stats for amount sold and total
            let productIDs = [];
            order.order.map(el => productIDs.push({id: el.id, total: el.total, quantity: el.quantity}))
            
            for(let i = 0; i < productIDs.length; i++){
                await Product.findByIdAndUpdate(productIDs[i].id, {$inc: {sold: productIDs[i].quantity, total: productIDs[i].total } })
            }

            //send the order to buyer
            await sendOrderEmail({
                email: order.email,
                data: order
            });

            //send order alert to admin
            await sendOrderAlertEmail({
                data: order
            });

            res.status(200).json({received: true})
        default:
            return res.status(400).send(`Webhook Error: ${event.type}`)
    }
}


//check balance of gift card, checkout page
exports.applyGiftCardBalance = catchAsync(async(req, res, next) => {

    const gift = await Gift.findOne({code: req.params.id})

    if(!gift || Date.now() > Date.parse(gift.expiry)){
        return res.status(200).json({
               status: "success",
               gift: -1,
        })
    } else {
        res.status(200).json({
            status: "success",
            gift: gift.balance,
        })
    }   
})

//create an order if grand total = 0
exports.createZeroGrandTotalOrder = catchAsync(async(req, res, next) => {
    const order = await Order.create(req.body)

    //increase loyalty points
    if(order.user !== "guest"){
        await User.findOneAndUpdate(order.user, {$inc: {loyalty_point: 1 }}, {new: true})
    }

    //decrease or delete gift card if it has been used
    if(order.gift_card){
        const gift = await Gift.findOne({code: order.gift_card_code})
        const value = gift.balance - order.gift_card_value;
        if(value === 0 || gift.expiry < Date.now()){
            await Gift.deleteOne({"code": order.gift_card_code})
        } else {
            gift.balance -= order.gift_card_value;
            await gift.save()
        }
    }

    //set stats for amount sold and total
    let productIDs = [];
    order.order.map(el => productIDs.push({id: el.id, total: el.total, quantity: el.quantity}))
    
    for(let i = 0; i < productIDs.length; i++){
        await Product.findByIdAndUpdate(productIDs[i].id, {$inc: {sold: productIDs[i].quantity, total: productIDs[i].total } })
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



/* order */

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

//delete orders 
exports.deleteOrder = catchAsync(async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    //set stats for amount sold and total
    let productIDs = [];
    order.order.map(el => productIDs.push({id: el.id, total: el.total, quantity: el.quantity}))
    

    for(let i = 0; i < productIDs.length; i++){
        await Product.findByIdAndUpdate(productIDs[i].id, {$inc: {sold: -productIDs[i].quantity, total: -productIDs[i].total, quantity: productIDs[i].quantity } })
    }

    await Order.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status: "success"
    })
})

/* GIFT Card */

//create gift card checkout session
exports.createGiftCardSession = catchAsync(async(req, res, next) => {
    //get the data to fill out the gift card
    const {data} = req.body;

    //create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${process.env.NODE_ENV === "production" ? "https://www.thecakedilemma.com" : "http://localhost:3000"}/gift-success`,
        cancel_url: `${process.env.NODE_ENV === "production" ? "https://www.thecakedilemma.com" : "http://localhost:3000"}/gift-cards`,
        customer_email: data.buyer_email,
        line_items: [
            {
                name: "Gift Card",
                images: ['https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Fwhite%20back.png?alt=media&token=f052d830-720f-4950-bcf1-7e942eb68c0f'],
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
    //development webhook
    //const webhook = process.env.WEBHOOK_SECRET_GIFT_CARD;

    //production webhook
    const webhook = process.env.WEBHOOK_SECRET_GIFT_CARD_LIVE 

    const signature = req.headers['stripe-signature'];

    let event;

    try{
        event = stripe.webhooks.constructEvent(req.body, signature, webhook);
    } catch(err){
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const intent = event.data.object
            const gift = await Gift.create({balance: intent.metadata.balance, code: crypto.randomBytes(20).toString('hex').substring(0, 16).toUpperCase()})

            await sendGiftCardToBuyerEmail({
                email: intent.metadata.buyer_email, 
                data: gift, 
                message: intent.metadata.message, 
                name: intent.metadata.name
            });
            await sendGiftCardToRecipientEmail({
                email: intent.metadata.recipient_email, 
                data: gift, 
                message: intent.metadata.message, 
                name: intent.metadata.name
            });

            res.status(200).json({received: true})
        default:
            return res.status(400).send(`Webhook Error: ${event.type}`)
    }
}

//check balance of gift card, gift card page
exports.getGiftCardBalance = catchAsync(async(req, res, next) => {

    const gift = await Gift.findOne({code: req.params.id})

    if(!gift || Date.now() > Date.parse(gift.expiry)){
        return next (new appError("Gift card doesn't exist or has expired.", 400))
    }

    res.status(200).json({
        status: "success",
        gift: gift.balance,
    })
})
