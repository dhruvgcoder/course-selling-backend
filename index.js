const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user.route");
const { courseRouter } = require("./routes/course.route")


app.use(express.json());
app.use('/user',userRouter);
app.use('/course',courseRouter)

app.listen(3000,function(){
    console.log("Server is running on 3000")
});