const express = require("express");
const app = express();
const { userRouter } = require("./routes/user.route");
const { courseRouter } = require("./routes/course.route")
const { adminRouter } = require("./routes/admin.route")
const dotenv = require("dotenv");
const mongoose = require("mongoose");


app.use(express.json());

app.use('/user',userRouter);
app.use('/course',courseRouter);
app.use('/admin',adminRouter);


dotenv.config(); // loading of .env file 
const checkConnection = async function (){
    try { 
    await mongoose.connect(process.env.MONGO_URL)  
        console.log("DB Connected Succesfully")
    app.listen(3000,function(){
        console.log("Server is running on 3000")
        });
    
} catch(err){
    console.log("Error in Database Connection:", err.message);
    res.status(500);
}
    
}
checkConnection();
