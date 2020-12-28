const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const {appError, catchAsync} = require('../util/CatchError');

//load user data
exports.loadUserData = catchAsync(async(req, res, next) => {

    const user = await User.findById(req.user.id);
    
    if(!user){
        return next (new appError("User does not exist.", 400))
    }

    res.status(200).json({
        status: 'success',
        user
    })
})

//let users change login email
exports.updateUserInfo = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password')
  
    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return next(new appError('Current Password Does not Match', 401));
    }
  
    // 3) update user information
    user.user = req.body.user;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
  
    res.status(200).json({
        status: 'success',
        user
    })
});

//let users address
exports.addAddress = catchAsync(async(req, res, next) => {
    const {first_name, last_name, email, address_1, address_2, city, postcode} = req.body;

    const user = await User.findById(req.user.id)

    if(!user){
        return next (new appError("No user with this id", 400))
    }

    user.address.unshift({first_name, last_name, email, address_1, address_2, city, postcode})

    await user.save()

    res.status(200).json({
        status: "success",
        user
    })
})

//let users remove address
exports.removeAddress = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user.id)

    if(!user){
        return next (new appError("No user with this id", 400))
    }

    const index = user.address.findIndex(el => el.id === req.params.id)

    user.address.splice(index, 1)

    await user.save()
    
    res.status(200).json({
        status: "success",
        user
    })
})

