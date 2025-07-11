const { Router } = require("express");

const userRouter = Router();


userRouter.get('/landing',function(req,res){
    res.json({
        msg : "User Landing page"
    })
});

userRouter.post('/signup',function(req,res){
    res.json({
        msg : "You Signed up successfully"
    })
});

userRouter.post('/signin',function(req,res){
    res.json({
        msg : "You signed in. successfully"
    })
});


module.exports = {
    userRouter : userRouter
}