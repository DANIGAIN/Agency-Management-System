import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        required:[true , "please provide a username"]
    },
    email:{
        type:String,
        required:[true , "Please provide a valid email"],
        unique:[true , "Please provide a unique email"]
    },
    password:{
        type:String,
        required:[true ,"please provide a password"]
    },
    role:{
        type: Number,
        require:[true , "plesae provide role"]
    },
    isVarify:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    forgotPasswordToken: String ,
    forgotPasswordTokenExpiry:Date,
    varifyToken:String,
    varifyTokenExpiey:Date,
},{
    timestamps: true 
})
const User =  mongoose.models.users || mongoose.model("users" , userSchema);
export default User ;