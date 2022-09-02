const express = require('express')

const router = express.Router();

const {NewOrder,getSingleOrder,MyOrder,getAllOrders,UpdateOrder} = require("../controller/OrderController")


const {IsUserAuthenticated,AuthoriseRole} = require("../middleware/IsUserAuthenticated")



//Create New Order  --Logged In
router.route("/order/new").post(IsUserAuthenticated, NewOrder)


//To see specific order's details of user own   --Logged Inn
router.route("/order/:id").get(IsUserAuthenticated ,AuthoriseRole("admin"),getSingleOrder);


//See All Orders placed by User himself   --Logged Inn
router.route("/orders/Myorder").get(IsUserAuthenticated, MyOrder);


//See All the list Of Orders Together By All Users  --ADMIN
router.route("/orders").get(IsUserAuthenticated,AuthoriseRole("admin"),getAllOrders);


//Update The Status Of The Order   ---ADMIN
router.route("/order/update").get(IsUserAuthenticated,AuthoriseRole("admin"),UpdateOrder);




module.exports = router;