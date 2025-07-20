const {Router} = require("express");
const courseRouter = Router();
    
courseRouter.get('/preview',function(req,res){
    res.json({
        msg : "All Courses fetched"
    })
});

courseRouter.get('/purchases',function(req,res){
    res.json({
        msg : "Purchase New Course"
    })
});


module.exports = {
    courseRouter : courseRouter
}