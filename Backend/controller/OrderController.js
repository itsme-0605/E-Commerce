const CatchAysncError = require('../middleware/ErrorAsyncHandler')

const ErrorHandler = require("../utils/errorHandler");

const Order = require("../models/OrderModel");

const Product = require("../models/productModel");

const User = require("../UserModel/UserSchema");



exports.NewOrder = CatchAysncError(async(req,res,next)=>{

    const {shippingInfo ,OrderItem,paymentInfo, ItemPrice,taxPrice,ShippingPrice,TotalPrice} = req.body;
    
    const order_Instance = await Order.create({
       shippingInfo,
       OrderItem,
       paymentInfo,
       ItemPrice,
       taxPrice,
       ShippingPrice,
       TotalPrice,
       paidAt: Date.now(),
       user_created:req.user.id
    })



    res.status(200).json({
        success:true,
        message:"Order Placed !"
    })


})



//Get Single Order details    --Logged Only   (Khud Ka order dekhna ho user ko to)
exports.getSingleOrder = CatchAysncError(async(req,res,next)=>{

    console.log("GET SINGLE ORDER DETAIL")
     const target_order = await Order.findById(req.params.id)

    // //here Populate functions takes value of field of "user" present in target_order , i.e. person who created that order.
    // //populate function fetches the user id from target_order and then goes into user database and fetch "name and email" field value of field of that Particular User who placed that order
   
    console.log(target_order)
   
    if(!target_order)
    return next(new ErrorHandler('Order ID Not Found',401));

    res.status(200).json({
        success:true,
        target_order
    })



})

//see all order of user own     --Logged Inn
exports.MyOrder = CatchAysncError(async(req,res,next)=>{


    console.log("MYORDER",req.user.id)

    const myorders = await Order.find({user_created:req.user._id})

    
    console.log(myorders.length)
    if(myorders.length==0)
    return next(new ErrorHandler('No Orders Placed Yet',401));

    res.status(200).json({
        success:true,
        myorders
    })


})



//Get List Of All Orders   --ADMIN
exports.getAllOrders = CatchAysncError(async(req,res,next)=>{

    const AllOrders = await Order.find();

    if(AllOrders.length ==0)
    return next(new ErrorHandler("No Orders Placed On App",201));

    res.status(200).json({
        AllOrders
    })
})




// // ************************************************************************************



async function UpdateStock(productId , StockCount){
    const product_target = await Product.findById(productId);

    product_target.stock-=StockCount;

    await product_target.save();


}


//Update The Status Of Order i.e. Shipped or Processing or Delivered    --ADMIN
exports.UpdateOrder = CatchAysncError(async (req,res,next)=>{

    const target_order = await Order.find({id:req.body.id});

    if(!target_order)
    return next(new ErrorHandler("No Order Found With Such ID",404));

    if(target_order.OrderStatus ==="Delivered")
    return next(new ErrorHandler("This Order has already been Delivered !",400));

     
    target_order.OrderItem.forEach(async(orders__) =>{

        await UpdateStock(orders__.product,order.quantity)
    })

    target_order.OrderStatus = req.body.status;

    if(req.body.status =="Delivered")
    target_order.deliveredAt = Date.now();


    await target_order.save();

    res.status(200).json({
        
        success:true,
        message: "Status Updated",
        target_order
    })



})


// // ***************************************************************************************

// //Delete Any Order --ADMIN
// exports.DeleteOrder = CatchAysncError(async(req,res,next)=>{

//     const Target_order = await Order.findById(req.params.id);

//     if(!Target_order)
//     return next(new ErrorHandler("Order Not In Record ",401));

//     Target_order.deleteOne();

//     res.status(200).json({
//         success:true,
//         message:"Order Deleted SuccessFully !"
//     })
// })