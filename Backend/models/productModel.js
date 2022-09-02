const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter The Product Name !"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please Enter The Product Description !"]

    },

    price: {
        type: Number,
        required: [true, "Please Enter The Product Price!"],
        maxLength: [8, "Price Can't Exceed 8 Characters"]
    },

    rating: {
        type: Number,
        default: 0
    },

    productImage: [
        {

            public_ID: {
                type: String,
                required: true,

            },
            image_url: {
                type: String,
                required: true,
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category !"]
    },
    stock:{
        type:Number,
        required:[true,"Please Provide Product stocks"],
        maxStock:[4,"No stock can be more than 9999"],default:1
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
     reviews:[
        {
            user_Id:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
     ],
      
    createdByUser:{

        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"user"
    },
     createdAt:{
        type:Date,
        default:Date.now
     }
})


module.exports = mongoose.model("ProductInfo",productSchema);