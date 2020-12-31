const User = require('../models/userModel');
const {appError, catchAsync} = require('../util/CatchError');
const {sendForgotPasswordEmail, emailConfirmation}= require('../util/Email');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES}
    )
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date( Date.now() + process.env.JWT_EXPIRES_NUM * 24 * 60 * 60 * 1000),
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        secure: process.env.NODE_ENV === "production" ? true : false,
      };

      res.cookie('jwt', token, cookieOptions);

      user.password = undefined

    res.status(statusCode).json({
      status: 'success',
      token,
      user
    });
};

exports.loggedIn = catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id).select('role')

    if(!user){
        return next( new appError('please log back in for a new token', 401))
    }
    
    res.json(user)
});

exports.signup = catchAsync(async(req, res, next) => {
    const user_exist = await User.find({user: req.body.user})
    const email_exist = await User.find({email: req.body.email})

    if(user_exist.length === 1){
        return next(new appError("Username already exist", 400))
    }

    if(email_exist.length === 1){
        return next(new appError("Email already exist", 400))
    }

    try{
        await emailConfirmation({
            email: req.body.email,
            code: req.body.code,
        });

        res.status(200).json({
            status: "success",
            message: 'Confirmation code sent to email'
        })
    } catch (err){
        return next(new appError("There was an error sending the email. Try again.", 500))
    }
})

exports.signupConfirm = catchAsync(async(req, res, next) => {
    const user = await User.create(req.body)

    if(!user){
        return next(new appError("Something went wrong", 400))
    }

    createSendToken(user, 201, res)
})


exports.login = catchAsync(async(req, res, next) => {

    const {password} = req.body

    let user;
    if(req.params.choice === "email"){
        user = (await User.findOne({email: req.body.user}).select('+password'));
    } else {
        user = (await User.findOne({user: req.body.user}).select('+password'));
    }

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError("Incorrect Login Information", 401))
    };

    //if everything okay send token to client
    createSendToken(user, 200, res);
})

//Protect routes 
exports.protect = catchAsync(async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if(!token){
        return next(new appError('Login to access these features', 401))
    };

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const existingUser = await User.findById(decoded.id);
    if(!existingUser){
        return next(new appError('The user belonging to this token does not exist.', 401))
    };

    //grant access to protected route if everything is good.
    req.user = existingUser;
    next();
}) 

//logout
exports.logout = async (req, res, next) => {
    const options = {
        expires: new Date( Date.now() + 2000),
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        secure: process.env.NODE_ENV === "production" ? true : false,
    }
    res.cookie('jwt', 'expiredtoken', options)
    res.status(200).json({
        status: 'success'
    })
};

//delete user account
exports.deleteAccount = catchAsync(async(req, res, next) => {

    await User.findByIdAndDelete(req.user.id)

    res.cookie('jwt', 'expiredtoken', options)
    res.status(200).json({
        status: 'success'
    })
})

//send reset password link to user email
exports.forgotPassword = catchAsync(async(req, res, next) => {
    //1) Get user based on post email
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new appError("There is no user with that email address", 404))
    }

    //2) generate random token reset token
    const resetToken = user.createPasswordResetToken();

    //set all the required field in the schema to false before we save. Issues like email and password required.
    await user.save({validateBeforeSave: false})

    //3) send to users email. Make sure to change the localhost:3000 or localhost:8000 or website
    const resetURL = `${process.env.NODE_ENV === "development" ? process.env.FRONTEND_PORT : process.env.WEBSITE_URL}/resetpassword/${resetToken}`;

    try{
        await sendForgotPasswordEmail({
            email: user.email,
            url: resetURL,
        });

        res.status(200).json({
            status: "success",
            message: 'Token sent to email'
        })
    } catch (err){
        user.passwordResetToken === undefined;
        user.passwordResetExpires === undefined;
        await user.save({validateBeforeSave: false})

        return next(new appError("There was an error sending the email. Try again.", 500))
    }
});

//send reset password link to user
exports.resetPassword = catchAsync(async(req, res, next) => {
    //1) get user based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    //2) if token has no expired, and there is user, set new password
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()} });
    if(!user){
        return next(new appError('Password Reset Time Expired.', 400))
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    //4) Log the user in, send jwt
    createSendToken(user, 200, res)
})

//black list users from injecting into body
exports.blackList = (...inputs) => {
    return (req, res, next) => {
        const {body} = req;
        let bodyProps;
        for(let props in inputs){
            bodyProps = inputs[props]
            if(body[bodyProps]) delete body[bodyProps]
        }
        next()
    }
}
