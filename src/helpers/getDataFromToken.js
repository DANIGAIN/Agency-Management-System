import jwt from "jsonwebtoken";
export async function getDataFromToken(request){
    try{
        const token = request.cookies.get('token')?.value || "";
        const decoededToken = await jwt.verify(token , process.env.TOKEN_SECRET)
        return decoededToken.id ;

    }catch(error){
        throw new Error(error.message)
    }
     
}