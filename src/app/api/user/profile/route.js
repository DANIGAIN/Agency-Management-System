import bcryptjs from 'bcryptjs'
import User from '@/modals/userModel'
import { connect } from '@/db/dbConfig'

connect()

export async function POST(request){
    try{
        const body = await request.json()
        const {name , email , password} = body
    
        const solt = await bcryptjs.solt(12)
        const hashPassword = bcryptjs.hash(password,solt)
        
        const obj = {
            name,
            email,
            password:hashPassword,
            role:10,
        }
        console.log(obj)
        const savedUser = await User.create(obj)
        return NextResponse.json({
            message:"User created Successfully",
            success : true,
            savedUser
      })

    }catch(error){
        return NextResponse.json({error : error.message} , {status:500});
    }
    


    
    
}