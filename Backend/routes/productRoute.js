const express = require("express");
const { getAllProduct, CreateProduct,UpdateProduct,DeleteProduct,GetSingleProductDetail } = require("../controller/productController");

//to Limit the access to particular type of Users --ADMIN for example
const {IsUserAuthenticated,AuthoriseRole} = require("../middleware/IsUserAuthenticated")

const router = express.Router();

//To see All Products
router.route("/products").get(getAllProduct);


//To Add New Products
router.route("/products/new").post(IsUserAuthenticated,AuthoriseRole("admin"),CreateProduct);  //for now it depicts that authentic logged in users only can Create ,Uppdate or  delete UserDetails


//Update Product List 
router.route("/products/:id").put(IsUserAuthenticated,AuthoriseRole("admin"),UpdateProduct);


//Delete Product 
router.route("/products/:id").delete(IsUserAuthenticated,AuthoriseRole("admin"),DeleteProduct);


// Get Product Details of any specific Product
router.route("/products/:id").get(GetSingleProductDetail);




module.exports = router;