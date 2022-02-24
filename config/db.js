
require("dotenv").config();
const mongoose = require("mongoose");


function connectDB(){
    console.log("Connecting...")
     mongoose.connect(process.env.MONGO_CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then((conc)=>{
        console.log("MongoDB Connected");
    }).catch(err=>{
        console.log(`Connection Failed `,err);
    })
    // const connection =mongoose.connection;

    // connection.once("open",()=>{
    //     console.log("database connected")
    // })

}

module.exports=connectDB;