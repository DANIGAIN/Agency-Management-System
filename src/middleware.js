import { NextResponse } from "next/server";

export async function middleware(req){
    const url = req.nextUrl;
    const pathname = url.pathname;
    if(pathname == '/' || pathname == '/home'){
        return NextResponse.rewrite(new URL('/home' , req.url))
    }
}
export const config = {
    matcher:[
        '/',
        '/home',
        '/login',
        '/signup',
        '/home/:id'
    ]
}