const mongoose = require("mongoose")
const Schema = mongoose.Schema;
// const {Schema} = require("mongoose"); destructuring Schema from mongoose library to use directly
const ObjectId = mongoose.Types.ObjectId ;
const dotenv = require("dotenv")

dotenv.config(); // loading of .env file 

const checkConnection = async function (){
   try{ await mongoose.connect(process.env.MONGO_URL)  
        console.log("DB Connected Succesfully")
    
} catch(err){
    console.log("Error in Database Connection");
}
    
}

checkConnection();

const userSchema = Schema({
    firstName : String,
    lastName : String ,
    email : { type : String , unique : true }  ,
    password : String

});

const courseSchema = Schema({
    title : String ,
    description : String ,
    price : Number ,
    imageUrl : String ,
    adminId : ObjectId
});

const adminSchema = Schema({
    firstName : String ,
    lastName : String ,
    email : String ,
    password : String

});

const purchaseSchema = Schema({
    courseId : ObjectId ,
    userId : ObjectId
});

const userModel = mongoose.model('user', userSchema)
const courseModel = mongoose.model('course', courseSchema)
const adminModel = mongoose.model('admin', adminSchema)
const purchaseModel = mongoose.model('purchase', purchaseSchema)

module.exports = {
    userModel ,
    courseModel,
    adminModel,
    purchaseModel
}

