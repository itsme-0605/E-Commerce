const app = require("./app")

const Dotenv = require("dotenv");


//Handling Uncaught Exception - Using Undeclared variables
process.on("uncaughtException",(err)=>{

    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unCaught Error`);
    process.exit(1);
})


//config dotenv environment

Dotenv.config({path:'./config/config.env'})



//Connecting Database

const connectDatabase = require('../Backend/config/database')

connectDatabase();

const PORT= 4000;

const server = app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})


//Establishing Cloudinary - A Virtual Platform responsible for Processing , storing and optimizing the image and Video content while online hostin

const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: 'hk1124cloudinary', 
    api_key: '282175975943783', 
    api_secret: 'XAAyrOGa7T5eka6h6T9bYTZtZ-g' 
  });



//Unhandled Promise Rejections - Errors like failure of Database Connection

process.on("UnhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to unhandled Rejection`);

    //Server Closing

server.close(()=>{
    process.exit(1);
})
})

