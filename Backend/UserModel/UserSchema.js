const mongoose = require('mongoose') 


// validator - For checking Parameters are rightly given or not by user. Eg: Number of phone is 10 or not.. Mail ID has @ or not

const validator = require('validator')


//For Encryption of Password

const bcrypt = require('bcryptjs')


//
const jwt = require('jsonwebtoken')


//Used for RESETing password
const crypto = require('crypto')



const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:[50,"Name Must Not Exceed 50 Characters"],
        minlength:[4,"Name Must be atleast 4 Characters"]

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please Enter The Valid Email"]

    },
    password:{
        type:String,
        required:[true,"Password Enter your password"],
        minlength:[8,"Password must atleast be 8 Character"],
        select:false, //select parameters refers to  the state that on being called , all field of information of user will be given if select parameter is by default true.
         
    },
    visible_password:{
        type:String,
        required:[true,"Password Enter your password"],
        minlength:[8,"Password must atleast be 8 Character"],
         
    },
    profilePic:{

        public_ID: {
            type: String,
            required: true,

        },
        image_url: {
            type: String,
            required: true,
        }
    },
   
    userType:{
        type:String,
        default:"user"
    },

    resetPasswordToken:{
        type:String,
        default:""
    },
    resetPasswordExpire:{
        type:Date,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


UserSchema.pre("save",async function(next){

     console.log("hiii")
    //incase of updating if password is not modified then it will hash the already hashed password
    if(!this.isModified('password')){                        
        next();
    }


    const hash  = await bcrypt.hash(this.password,10);

    console.log(hash)

    this.password = hash;
})



//JWT Token -- Responsible for Remen=mbering cookie of User to Identify its authenticity.
// It allows the limited mentioned User to fetch specific APIs

process.env.JWT_Expires = "5d";
process.env.JWT_SECRET = "ILOVESHEFALIMAAM"


UserSchema.methods.getJWTToken=function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_Expires,
    })
}


//Compare Password
UserSchema.methods.comparePassword=async function(inputPassword)
{
    return await bcrypt.compare(inputPassword,this.password)
}


//Generating Password to RESET Password

UserSchema.methods.getResetPasswordToken =()=>{

    //Generating Click token i.e. link to reset the User Account Password
    const resetToken = crypto.randomBytes(20).toString("hex");

    console.log(this.resetPasswordToken,this.resetPasswordExpire)
    //it will hash the generated token link
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    
    //Limiting the applicable time reset password hashed token (here 15min)
    this.resetPasswordExpire = Date.now() + 15*60*1000; 

   
    
    console.log(this.resetPasswordToken,this.resetPasswordExpire)

    return resetToken;



}


module.exports = mongoose.model("Users",UserSchema);