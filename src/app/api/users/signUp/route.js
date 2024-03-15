import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import  bcryptjs  from "bcryptjs";
import { connect } from "@/db/dbConfig";

connect();

export async function POST(request){
     try{
           const userData = await request.json();
           const {name , email , password} = userData;

           const user = await User.findOne({email});
           if(user){
               return NextResponse.json({error:"User alrady exists"} ,{status:400});
           }else{
               //create hash password 
               const solt = await bcryptjs.genSalt(10);
               const hashPassword = await bcryptjs.hash(password, solt);
               const savedUser =  await User.create({name , email , password:hashPassword, role:10});

               return NextResponse.json({
                     message:"User created Successfully",
                     success : true,
                     savedUser
               })

               
           }
     }catch(error){
        return NextResponse.json({error : error.message} , {status:500});
     }
}