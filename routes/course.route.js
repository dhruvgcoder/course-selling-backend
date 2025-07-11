const {Router} = require("express");
const courseRouter = Router():
    
app.get('/courses/preview',function(req,res){
    res.json({
        msg : "All Courses fetched"
    })
});

app.get('/course/purchase',function(req,res){
    res.json({
        msg : "Purchase New Course"
    })
});
}

module.exports = {
    courseRouter : courseRouter
}