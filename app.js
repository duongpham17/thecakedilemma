const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config({ path: "./config.env" });

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./controllers/authController');
const orderController = require('./controllers/orderController');
const {errorMessage} = require('./util/CatchError');

const app = express()

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? process.env.WEBSITE_URL :  process.env.FRONTEND_PORT,
    credentials: true,
}));

const limiter = (rate, minute, message) => rateLimit({
    max: rate,
    windowMs: minute * 60 * 1000,
    message: message
})

app.use(`/users/login`, limiter(12, 5, "Max attempt. Try again in 5 minutes" ));
app.use(`/users/forgotpassword`, limiter(3, 3, "Please check your junk, or try again in 3 minutes"))

app.use(mongoSanitize());
app.use(xss());

//stripe webhooks
app.post('/webhook-checkout-order', bodyParser.raw({type: 'application/json'}), orderController.webhookCheckoutOrder);
app.post('/webhook-checkout-gift-card', bodyParser.raw({type: 'application/json'}), orderController.webhookCheckoutGiftCard);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({extended: true, limit: '100kb'}))
app.use(cookieParser());

app.use('/admins', adminRoutes);
app.use(authRoutes.blackList('role'));
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/home', homeRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(errorMessage)

module.exports = app