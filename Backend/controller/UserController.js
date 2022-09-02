
const ErrorHandler = require('../utils/errorHandler')

const CatchAsyncErrors = require('../middleware/ErrorAsyncHandler')

const User = require('../UserModel/UserSchema')

const sendToken = require("../utils/JWTToken")

const fs = require('fs')

const mongoose=require('mongoose')


const sendRESETEmail = require('../utils/SendResetEmail')

const Product = require("../models/productModel")


//Using Crypto for ResetPassword feature for Token Hashing
const crypto = require('crypto') // build-in module in NODE
const { Console } = require('console')

const cloudinary = require('cloudinary')


//Register a User

exports.RegisterUser=CatchAsyncErrors(async(req,res,next)=>{
    

    console.log('yaha aaya')


   const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:'Avatars',
    width:150,
    crop:'scale'
   })

   console.log('yaha aaya')


    console.log("aaya",req.body)
    const {name,email,password} = req.body;

    console.log(name,email,password)

    const user = await User.create({
        name,
        email,
        password,
        profilePic:{
            public_ID:mycloud.public_id,
            image_url:mycloud.secure_url
        },
        visible_password:password

    });

    console.log(user)

    //TokenGeneration Using JWT

    // const token = user.getJWTToken();

    

    //  console.log("ss")
    sendToken(user,200,res);
});




//Login Already Registered User

exports.LoginUser = CatchAsyncErrors(async (req,res,next)=>{

    const inputEmail=req.body.email;
    const inputPassword=req.body.password;
    console.log(inputEmail,inputPassword)

    if(!inputEmail || !inputPassword){
        
        return next(new ErrorHandler("Please Enter the valid email or password",404));

    }

    const target_user = await User.findOne({email:inputEmail}).select('+password')

    console.log(target_user)
    

    if(!target_user){
        return next(new ErrorHandler("User Not Registered !",404));
    }



    const isPasswordMatch = await target_user.comparePassword(inputPassword);


    console.log("comparision: ", isPasswordMatch)

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password",401))
    
    }

     sendToken(target_user,200,res);


})



//LogOut User

exports.LogOutUser = CatchAsyncErrors(async(req,res,next)=>{

    const options={
        expires:new Date(Date.now()),
        httpOnly:true,
    }

    //terminate the stored token in cookie
    res.cookie('token',null,options)

    //******since using local_storage for cookies*************************** */
    //**we will empty the cookie_local_storage.txt file*************************** */

    fs.writeFile("cookie_local_storage.txt","",(err)=>{
        if(err)throw err;
    })



    res.status(200).json({
        success:true,
        message:"Logged Out Successfully"
    })
})


//User Forget Password

exports.forgotPassword = CatchAsyncErrors(async (req,res,next)=>{

    console.log(req.body.email)
    //search user whose email is given to which password reset is being done
    const user_target = await User.findOne({email:req.body.email})

    console.log("forgetpassword",user_target)


    if(!user_target)
    return next(new ErrorHandler("User Not Found",404));

    //Reseting Password by Token
    const TokenReset = user_target.getResetPasswordToken();


    console.log("reset token",TokenReset)

    await user_target.save({validateBeforeSave:false})
 

    console.log("saved with token reset password",user_target)



    const resetPasswordURL = `http://localhost:3000/password/reset/${TokenReset}`
    //this line will work when runn on lcal but if we deloy the website then there mat be chances that 
    // "http" protocol may change to "https" and host name change from "localhost" to definite WEBSITE Name


// *****************************************************************************************************************
   
//This above resetPasswordLink can be generalised as: 
//const resetPasswordURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}` 

// ********************************************************************************************************************

    // it is the message written in mail in which reset link will be send to Given User Email ID

    const message = `Your password reset token is: \n\n ${resetPasswordURL}\n\n Please Ignore if its not you.`
    console.log(message)
    try{

        //If link is being used then do this:

        //sending link to  email
        console.log("try ",user_target.email)
        await sendRESETEmail({
            email:user_target.email,
            subject:`Ecommerce Reset Password`,
            message

        });

        res.status(200).json({
            success:true,
            message:`Email send to ${user_target.email} Successfully`
        })

    }
    catch(err){

        //If link is not being used then Remove the Temporary reset token and its expiring time from user_target
        
        user_target.resetPasswordToken = undefined;
        user_target.resetPasswordExpire = undefined;

        await user_target.save({validateBeforeSave: false});

        return next(new ErrorHandler(err.message,500));

    }





})




//ResetPassword when link has been generated and mailed

exports.resetPassword=CatchAsyncErrors(async(req,res,next)=>{


    
   const ResetPassword_requested = req.params.token;

   //since this ResetPassword_requested is needed to be searched in all user's resetPasswordToken String which is Hashed 
   //thus using crypto to compare ResetPassword_requested and all user's resetPasswordToken string in hashed form

   console.log("RESET PASSWORD AA GAYA",ResetPassword_requested)
   const ResetPasswordToken_Requested_hashed = crypto.createHash("sha256").update(ResetPassword_requested).digest("hex")

   console.log("RESET PASSWORD AA GAYA",ResetPasswordToken_Requested_hashed)



   const user_target = await User.findOne({

    resetPasswordToken: ResetPasswordToken_Requested_hashed,
    resetPasswordExpire:{ $gt: Date.now()}

   });

   if(!user_target)
   return next(new ErrorHandler("Reset Password Token is Invalid Or has expired",400))

   if(req.body.NewPassword !== req.body.confirmPassword)
   return next(new ErrorHandler("Password Fields Doesn't Matched",401))

   user_target.password = req.body.NewPassword;

   user_target.resetPasswordToken = undefined;
   user_target.resetPasswordExpire = undefined;

   await user_target.save({validateBeforeSave: false});

   //login automatically

   sendToken(user_target,200,res);


})




//Get User Info i.e. Profile
exports.getUserDetails = CatchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})


//Updating the Password -- for which you must have to be logged in

exports.UpdatePassword = CatchAsyncErrors(async(req,res,next)=>{

    const target_user = await User.findById(req.user.id).select('+password')

    const isMatchedPassword = await target_user.comparePassword(req.body.OldPassword);

    if(!isMatchedPassword)
    return next(new ErrorHandler("Old Password is Incorrect",401))

    if(req.body.NewPassword !== req.body.confirmPassword)
    return next(new ErrorHandler("Password Doesn't match",401));

    target_user.password = req.body.NewPassword;
    target_user.visible_password = req.body.NewPassword;

    await target_user.save();

    sendToken(target_user,200,res);


})



//Updating User Profile except Password  -- Only for Logged In Person
exports.UpdateProfile = CatchAsyncErrors(async(req,res,next)=>{

    let target_user = await User.findById(req.user.id);

    if(!target_user)
    return next(new ErrorHandler("Please Login In First",401));

    target_user = await User.findByIdAndUpdate(req.user.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        target_user
    })
})



//Get All Users Info --Only Admin
exports.GetAllUser = CatchAsyncErrors(async(req,res,next)=>{

    const AllUsers = await User.find();

    res.status(200).json({
        AllUsers
    })

})

//Get Specific User Info  --Only Admin
exports.GetSingleUserInfo = CatchAsyncErrors(async(req,res,next)=>{

    const SingleUserInfo = await User.findById(req.params.id);

    if(!SingleUserInfo)
    return next(new ErrorHandler("User Not Found",401));



    res.status(200).json({
        SingleUserInfo
    })

})



//Update User's Role Type   --OnlyADMIN 
exports.UpdateRole = CatchAsyncErrors(async(req,res,next)=>{

 const NewData = {
    email:req.body.email,
    name:req.body.name,
    UserType:req.body.UserType
 }

 const user_target = await User.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
        runValidators:true,
        useFindAndModify:false
 })

 await user_target.save();

 res.status(200).json({
    success:true,
    user_target
 })

})

//Delete User   --OnlyADMIN 
exports.DeleteUser = CatchAsyncErrors(async(req,res,next)=>{

    const user_target = await User.findById(req.params.id)
   
    if(!user_target)
    return next(new ErrorHandler("User Not Found",401));

    await user_target.deleteOne();
   
    res.status(200).json({
       success:true,
       message:"User Removed Successfully"
    })
   
   })



//Add/Update the Product Review    --Only who are logged In
exports.CreateProductReview=CatchAsyncErrors(async(req,res,next)=>{
  
    console.log("rievew",req.body.productID)
 
    const current_review ={
        user_Id:req.user.id,
        name:req.user.name,
        rating:Number(req.body.rating),
        comment:req.body.comment
    }

    const target_product = await Product.findById(req.body.productID)

    console.log(target_product)

    console.log("Product review ",target_product.reviews);

    let isReviewed=false;

    await target_product.reviews.forEach((rev)=> {
    
        console.log(rev.user_Id.toString(),req.user._id.toString())
        
        if(rev.user_Id.toString()==req.user._id.toString())
        isReviewed=true;

    });

    let review_status="Added";
    console.log(isReviewed)
    
    if(isReviewed)
    {
        review_status = "Updated"
        console.log(isReviewed)
        //if already reveiwed then update the previous review by new one

        target_product.reviews.forEach((rev)=>{


            console.log(rev.user_Id.toString(),req.user.id.toString())

            if(rev.user_Id.toString()===req.user.id.toString())
            (rev.rating = current_review.rating),(rev.comment = current_review.comment);
                
            
        })

    }
    else
    {

        //creatig new Review if not existing for specific user
        target_product.reviews.push(current_review)
        console.log("review added",target_product.reviews,current_review)
        target_product.numberOfReviews = target_product.reviews.length;


       
    }

    let sum=0;
    target_product.reviews.forEach((rev)=>{
       sum=sum + parseInt(rev.rating);
       console.log(rev.rating , sum)
   });
   

   target_product.rating =sum /target_product.numberOfReviews;



    await target_product.save();


    res.status(200).json({
        success:true,
        message:review_status
    })

})



//get All reviews Of the Specific Product
exports.GetSingleProductReviews = CatchAsyncErrors(async(req,res,next)=>{

    const product_target = await Product.findById(req.params.productID);

    if(!product_target)
    return next(new ErrorHandler("Product Not Found",401));

    res.status(200).json({
        REVIEW:product_target.reviews
    })
})


//Delete reviews Of the Specific Product
exports.DeleteSingleProductReviews = CatchAsyncErrors(async(req,res,next)=>{

    const product_target = await Product.findById(req.params.productID);

    if(!product_target)
    return next(new ErrorHandler("Product Not Found",401));

   
    const AllReviews = product_target.reviews.filter((rev)=>{

       
        return ( rev.user_Id.toString() !== req.user.id.toString() );

    })

   

    product_target.reviews = AllReviews;

    //after deleting reflecting changes in  rating and Number of Reviews field
   
    
    let sum=0;


    AllReviews.forEach((rev)=>{
        sum+=rev.rating;
    })


    product_target.numberOfReviews -=1;

    product_target.rating = sum /  product_target.numberOfReviews;

    await product_target.save()

    res.status(200).json({
        REVIEW:product_target.reviews
    })
})




