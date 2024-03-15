import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/db/dbConfig";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try {
        const userData = await request.json();
        const { email, password } = userData;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User cannot exists" }, { status: 400 });
        } else {

            //compare hash password 
            const varifyPassword = await bcryptjs.compare(password, user.password);
            if (!varifyPassword) {
                return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
            }


            //create token --> 
            const tokenData = {
                id: user._id,
                name: user.name,
                email: user.email
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '30d' });
            const res = NextResponse.json({
                message: "User created Successfully",
                success: true,
                user
            })
            res.cookies.set('token', token, { httpOnly: true })
            return res;
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}