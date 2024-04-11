import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowerCase:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    password: {
        type: String,
    },
    providerId:{
        type: String
    },
    role: {
        type: Number,
        required: true
    },
    isVerified: { 
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpiry: {
        type: Date
    },
    verifyToken: { 
        type: String
    },
    verifyTokenExpiry: { 
        type: Date
    }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
