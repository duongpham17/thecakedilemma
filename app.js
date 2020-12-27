const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: "./config.env" });

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./controllers/authController');
const {errorMessage} = require('./util/CatchError');

const app = express()

app.use(cors({
    //this has to be frontend localhost
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

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({extended: true, limit: '100kb'}))
app.use(cookieParser());

app.use('/admins', adminRoutes);
app.use(authRoutes.blackList('role'));
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(errorMessage)

module.exports = app