const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError=require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj =(obj,...allowedFields)=>{
   const newObj={};
   Object.keys(obj).forEach(el=>{
     if(allowedFields.includes(el)) newObj[el]=obj[el];
   })
   return newObj;
}

exports.updateMe= catchAsync(async (req,res,next)=>{
  //1 If there is a update on password or password confirm return.
  if(req.body.password||req.body.passwordconfirm){
    return next(new AppError('This route is not for password updating',401));
  }
  
  //2 update the user data.
  const filteredObject=filterObj(req.body, 'name','email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredObject,{new:true,runValidator:true});
  res.status(200).json({
    status:'success',
    data:{
      user:updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
      
  const user =await User.findByIdAndUpdate(req.user.id,{active:false});
  res.status(204).json({
    status:'success',
    data:null
  })

});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
