const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

    shippingInfo :{

        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pinCode:{
            type:Number,
            required:true,
            maxlength:[6||"Please Enter Valid PINCode !"]
        },
        phoneNo:{
            type:Number,
            required:true,
            minlength:[10||"Please Enter the 10 dihit valid Number"]
        }
    },



    OrderItem:[{

        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product",
            required:true
        }

    }],


    user_created:{
      
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },

    paymentInfo:{

        id:{
            type:String,
            required:true

        },
        status:{
            type:String,
            required:true
        }

    },

    paidAt:{
        type:Date,
        required:true

    },

    ItemPrice:{
        type:Number,
        default:0,
        required:true

    },

    
    taxPrice:{
        type:Number,
        default:0,
         required:true

    },

    
    ShippingPrice:{
        type:Number,
        default:0,
         required:true

    },
    
    TotalPrice:{
        type:Number,
        default:0,
         required:true

    },

    OrderStatus:{
        type:String,
        default:"Processing",
         required:true

    },

    deliveredAt: Date,

    createdAt:{
        type:Date,
        default:Date.now,

    }

});



module.exports = mongoose.model("Order",OrderSchema);
