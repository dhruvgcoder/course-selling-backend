const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

app.use(express.json());

app.get('/user',function(req,res){
    res.json({
        msg : "User Data"
    })
});

app.post('/user/signup',function(req,res){
    res.json({
        msg : "You Signed up successfully"
    })
});

app.post('/user/signin',function(req,res){
    res.json({
        msg : "You signed in. successfully"
    })
});

app.get('/user/purchases',function(req,res){
    res.json({
        msg : "Purchase course fetched"
    })
})

app.get('/courses',function(req,res){
    res.json({
        msg : "All Courses fetched"
    })
})

app.get('/course/purchase',function(req,res){
    res.json({
        msg : "Purchase New Course"
    })
})

app.listen(3000,fucntion(){
    console.log("Server is running on 3000")
});