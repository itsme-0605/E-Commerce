const mongoose = require("mongoose");

const connectDatabase=()=>{


    mongoose.connect("mongodb://localhost:27017/Ecommerce",{useNewURLParser:true}).then((data)=>{
        console.log(`MongoDB connected with the server: ${data.connection.host}`)}).catch((err)=>{
            console.log(`Error due to ${err}`);
        })
    


}
module.exports = connectDatabase;