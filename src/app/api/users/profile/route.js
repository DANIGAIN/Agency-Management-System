import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET(request){
    try{
       const userId = await getDataFromToken(request)
       const user = await User.findOne({_id: userId}).select("-password");
       return NextResponse.json({
           success: true ,
           message:"User Founded",
           user
       });
    }catch(error){
        return NextResponse.json({error: error.message} , {status: 500})
    }
}