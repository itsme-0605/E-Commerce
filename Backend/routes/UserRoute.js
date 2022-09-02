const express = require('express')

const router = express.Router();

const {RegisterUser,LoginUser,LogOutUser, forgotPassword,resetPassword, getUserDetails,UpdatePassword, UpdateProfile,GetAllUser,GetSingleUserInfo,DeleteUser,UpdateRole, CreateProductReview, GetSingleProductReviews,DeleteSingleProductReviews} = require('../controller/UserController');

const {IsUserAuthenticated, AuthoriseRole} = require('../middleware/IsUserAuthenticated')

//Registering User
router.route("/register_user").post(RegisterUser);


//Login User
router.route("/login_user").post(LoginUser)


//LogOut User
router.route("/logout_user").get(LogOutUser)


//forgot Password
router.route("/password/forget").post(forgotPassword)

//ResetPassword
router.route("/password/reset/:token").put(resetPassword)


//Get Profile Details - this can be done only if logged in
router.route("/MyProfile").get(IsUserAuthenticated,getUserDetails)

//Update The Password - this can be done only if logged in
router.route("/password/update").put(IsUserAuthenticated,UpdatePassword)

//Update Profile Info -- Logged In Person Only
router.route("/MyProfile/update").put(IsUserAuthenticated,UpdateProfile);

//Get All User's Information  --Admin Only
router.route("/admin/Users").get(IsUserAuthenticated,AuthoriseRole("admin"),GetAllUser);

//Get Specific User's Information   --Admin Only
router.route("/admin/Users/:id").get(IsUserAuthenticated,AuthoriseRole("admin"),GetSingleUserInfo);

//Update The User Role  --Admin Only Access
router.route("/admin/update_role/:id").put(IsUserAuthenticated,AuthoriseRole("admin"),UpdateRole);

//Delete The User   --ADMIN Only
router.route("/admin/delete_user/:id").delete(IsUserAuthenticated,AuthoriseRole("admin"),DeleteUser);


//Add/Update Product Reviews   --Only Logged In
router.route("/review").put(IsUserAuthenticated,CreateProductReview)


//getting reviews of specific Product   --All
router.route("/review/:productID").get(GetSingleProductReviews);


//Deleting reviews of specific Product   --LOGGED INN
router.route("/review/:productID").delete(IsUserAuthenticated, DeleteSingleProductReviews);





module.exports =  router;