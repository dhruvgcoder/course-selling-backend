const { Router } = require("express");
const { z } = require("zod")
const userRouter = Router();
const bcrypt = require("bcrypt")
const { userModel } = require("../db/db");
const jwt = require("jsonwebtoken")
const { adminMiddleware } = require("../middleware/admin")


userRouter.get('/landing',function(req,res){
    res.json({
        msg : "User Landing page"
    })
});

userRouter.post('/signup',async function(req,res){

const requiredFields = z.object({
    email : z.string().min(4).max(50).email(),
    password : z.string().min(8).max(100),
    firstName : z.string().min(2).max(100),
    lastName : z.string().min(2).max(100)
    })

const parseDataWithSuccess = requiredFields.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        res.status(400).json({
            msg : "Inavlid Inputs",
            error : parseDataWithSuccess.error
        })
        return;
    }
 
const { email , password , firstName , lastName } = req.body

const duplicateUser = await userModel.findOne({email})
if(duplicateUser){
    res.json({
        msg : "User Already Exist"
    })
}
const hashedPassword = await bcrypt.hash(password,12);


try {
    await userModel.create({
    email ,
    password : hashedPassword ,
    firstName,
    lastName 
})


}catch(err){
    console.log("Signup error:");
    res.status(400).json({
        msg : "error while signing up",
    })
}
res.json({
    msg : "You  (user) Signed up successfully"
})


});

userRouter.post('/signin', async function(req,res){
    const { email , password } = req.body

    const findUser = await userModel.findOne({
        email : email ,
    });

    if(!findUser){
        res.status(404).json({
            msg : "User does not exist"
        })
    }

    const checkPassword = await bcrypt.compare(password,findUser.password)
    if(checkPassword){
        const token = jwt.sign({
            id : findUser._id.toString()
        }, process.env.JWT_USER_SECRET)

    res.json({
        token : token ,
        msg : "You signed in. successfully"
    })
    }else{
        res.status(401).json({
            msg : "Invalid credentials"
        })
    }
});



module.exports = {
    userRouter : userRouter
}