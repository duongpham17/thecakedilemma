const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    loyalty_point: {
        type: Number,
        default: 0
    },
    shipping_point:{
        type: Number,
        default: 0
    },
    address:[{
        first_name: String,
        last_name: String,
        email: String,
        address_1: String,
        address_2: String,
        city: String,
        postcode: String,
    }],
    password:{
        type: String,
        select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
})

//hashing the password with package called (bcryptjs)
userSchema.pre('save', async function(next){
    //only run this when password has been modified
    if(!this.isModified('password')) return next();

    //hash password
    this.password = await bcrypt.hash(this.password, 12);

    next();
})
//check if confirm password matches the encrypted password.
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return bcrypt.compare(candidatePassword, userPassword)
}
//generate a random token, to let users go to a reset password link
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    //encrypt the token given to the user for the reset password link
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //last for a total of 10minutes this token
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User', userSchema)
module.exports = User