const {Router} = require("express");
const adminRouter = Router();
const { adminModel } = require("../db/db");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { z } = require("zod")
const { adminMiddleware } = require("../middleware/admin")
const {courseModel} = require("../db/db");

adminRouter.post('/signup',async function(req,res){
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

const duplicateAdmin = await adminModel.findOne({email})
if(duplicateAdmin){
    res.json({
        msg : "Admin Already Exist"
    })
}
const hashedPassword = await bcrypt.hash(password,9);


try {
    await adminModel.create({
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
    msg : "You Signed up successfully"
})


});

adminRouter.post('/signin', async function(req,res){
    const { email , password } = req.body

    const findUser = await adminModel.findOne({
        email : email ,
    });

    if(!findUser){
        res.status(404).json({
            msg : "Admin does not exist"
        })
    }

    const checkPassword = await bcrypt.compare(password,findUser.password)
    if(checkPassword){
        const token = jwt.sign({
            id : findUser._id.toString()
        }, process.env.JWT_ADMIN_SECRET)

    res.json({
        token : token ,
        msg : "You (admin) signed in. successfully"
    })
    }else{
        res.status(401).json({
            msg : "Invalid credentials"
        })
    }
});

adminRouter.put('/create', adminMiddleware , async function(req,res){

    const adminId = req.adminId;

    const { title , description , imageUrl , price } = req.body

    const course = await courseModel.create({
        title ,  
        description ,
        imageUrl ,
        price ,
        adminId
    })

    res.json({
        msg : "course created",
        courseId : course._id
    })
});

adminRouter.post('/edit',adminMiddleware ,async function(req,res){
    const adminId = req.adminId;

    const { title , description , imageUrl , price , courseId } = req.body
   
    const course = await courseModel.updateOne({
        _id : courseId,
        adminId : adminId 
    },{ 
        title ,
        description ,
        imageUrl ,
        price ,
        adminId
    })

    res.json({
        msg : "course updated",
        courseId : course._id
    })

});

adminRouter.get('/bulk',adminMiddleware ,async function(req,res){
    const adminId = req.adminId;
   
    const course = await courseModel.find({ // find return the array of courses
    adminId : adminId
    })
    // .select("title description price") -> to filter what option can be shown while fetching
    res.json({ 
        course
    })
});
module.exports = {
adminRouter : adminRouter 
}