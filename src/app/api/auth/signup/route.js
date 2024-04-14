import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/modals/userModel'
import { connect } from '@/db/dbConfig'
import { adminUser } from '@/lib/constants'

connect()

export async function POST(request) {
    try {
        const body = await request.json()
        const { password, name, email } = body

        //check user exist or not ---> 
        const user = await User.findOne({email})
        if(user) {
            return NextResponse.json({
                success: false,
                id: user._id,
                message:"User Alrady exist"
            }, { status:400 })
        }

        const solt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, solt)
        const role =   (adminUser.includes(email)) ? 0 : 10;
        const savedUser = await User.create({ name, email, password: hashPassword, role})
        savedUser.password = password;
        return NextResponse.json({
            success: true,
            savedUser,
            message: "User is created successfuly"
        } , {status:200 })

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err,
            message: "User can not Created"
        }, { status: 500 })

    }




}