const {Router} = require("express");
const adminRouter = Router();
const { adminModel } = require("../db/db");

adminRouter.post('/signin',function(req,res){
    res.json({
        msg : "Signed in successfuly"
    })
});

adminRouter.post('/create',function(req,res){
    res.json({
        msg : "course created"
    })
});

adminRouter.post('/delete',function(req,res){
    res.json({
        msg : "course deleted"
    })
});

module.exports = {
    adminRouter : adminRouter
}