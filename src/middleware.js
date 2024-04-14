import {  NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const SECRET = process.env.SECRET
export  async function middleware(req){
    const token = await getToken({req ,secret: SECRET})
    const url = req.nextUrl;
    const pathname = url.pathname;
    if(pathname == '/' || pathname == '/home'){
        return NextResponse.rewrite(new URL('/home' , req.url))
    }
    if((token && pathname == '/agency/login') || (token && pathname == '/agency/signup')){
        return NextResponse.redirect(new URL('/home', req.url))
    }
}
export const config = {
    matcher:[
        '/',
        '/home',
        '/agency/login',
        '/agency/signup',
        '/home/:id',
        '/agency/dashboard'
    ]
}