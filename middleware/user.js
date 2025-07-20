const jwt = require("jsonwebtoken")

function userMiddleware(req ,res , next){
    const token = req.headers.token
    const decoded = jwt.verify(token,process.env.JWT_USER_SECRET)
    if(decoded){
        req.userId = decoded.id // because we encoded using user id so we get in decoded.id
    next();
}else{
    res.status(403).json({
        msg : "You are not signed in"
        // throw new Exception("msg") can also be done for user defined exception 
    });
}
}

module.exports = {
    userMiddleware // if key : value have same name then we can can write it once
}                 // rather writing userMiddlware : userMiddleware  
