const {Router} = require("express");
const courseRouter = Router();
    
courseRouter.get('/courses/preview',function(req,res){
    res.json({
        msg : "All Courses fetched"
    })
});

courseRouter.get('/course/purchase',function(req,res){
    res.json({
        msg : "Purchase New Course"
    })
});


module.exports = {
    courseRouter : courseRouter
}