const ErrorHandler = require("../utils/errorHandler");

const CatchAsyncErrors = require("./ErrorAsyncHandler");

const fs = require('fs')

const jwt = require("jsonwebtoken")

const User = require("../UserModel/UserSchema");


//To store the information of the Logged In User
var LoginUserInfo;


exports.IsUserAuthenticated = CatchAsyncErrors(async(req,res,next)=>{

//Fetching stored token from cookie but not working
    // const  token  = req.cookies;
      // console.log("Auth" , token)

    //Fetching Current token from Local_cookie_storage file
    const token=fs.readFileSync("cookie_local_storage.txt","utf8")

    console.log(`current token fetched from local_cookie_storage is: ${token}`)

    if(!token)
    {
        console.log("error de raha")
        return next(new ErrorHandler('Please Login First to use this resource',401))

    }

    var JWT_SECRET ="ILOVESHEFALIMAAM"

    const decodedData = jwt.verify(token,JWT_SECRET);

    console.log(decodedData)

    loginUserInfo= await User.findById(decodedData.id) 

    req.user=loginUserInfo;

    next();

});


exports.AuthoriseRole=(...roles)=>{
    return (req,res,next)=>{


        console.log(loginUserInfo,roles)

        if(!roles.includes(loginUserInfo.userType))
        {
            console.log("xxx")
            return next(new ErrorHandler(`Role: ${loginUserInfo.role} is not allowed`,401))
        }

        next();
    }
}
