const jwt = require("jsonwebtoken")

function adminMiddleware(req ,res , next){
    const token = req.headers.token
    const decoded = jwt.verify(token,process.env.JWT_ADMIN_SECRET)
    if(decoded){
        req.adminId = decoded.id // because we encoded using user id so we get in decoded.id
    next();
}else{
    res.statu(403).json({
        msg : "You are not signed in"
    })
}
}

module.exports = {
    adminMiddleware
}