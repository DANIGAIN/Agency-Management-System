import { NextResponse } from "next/server";

export async function middleware(request){
     const path = request.nextUrl.pathname;
     const isPublicPath = path == '/login' || path == '/signup'
     const tokan  = request.cookies.get('token')?.value ||'';

     if(!isPublicPath && !tokan){
        return NextResponse.redirect(new URL('/login' , request.url))
     }

     if(isPublicPath && tokan){
        return NextResponse.redirect(new URL('/' , request.url))
     }

} 

export const  config = {
     matcher:[
        '/',
        '/login',
        '/signup',
        '/profile',
        '/profile/:id*'
     ]
}