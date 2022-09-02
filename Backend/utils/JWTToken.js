
const fs= require('fs')


//Creating Token and Storing in Cookies


const sendToken = (user,statuscode,res)=>{

    const token = user.getJWTToken();

    //Options_For_Cookies
    const COOKIE_EXPIRE = 1;  //number of days in which cookie get expired
    const options ={
        httpOnly:true,
        expires:new Date(
            Date.now() + COOKIE_EXPIRE*24*60*60*1000
        )
    }

    //cookie-parser was not working thus used Local Cookie Storage
    fs.writeFile('cookie_local_storage.txt', token, function (err) {
        if (err) throw err;
        else
        console.log('Saved!');
      });

    res.status(statuscode).cookie('token',token,options).json({
        success:true,
        user,
        token,
    });

     
};


module.exports = sendToken;