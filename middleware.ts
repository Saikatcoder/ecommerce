import { getToken } from "next-auth/jwt";
import {  NextRequest, NextResponse } from "next/server";


export const middleware = async(req:NextRequest)=>{
 const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
 const pathname = req.nextUrl.pathname

 if(pathname.startsWith('/login' )&& session){
  return NextResponse.redirect(new URL("/",req.url))
 }
 if(pathname.startsWith ('/signup') && session){
  return NextResponse.redirect(new URL("/",req.url))
 }

 if(pathname.startsWith('/user') && !session){
    return NextResponse.redirect(new URL('/login',req.url))
 }

 if(pathname.startsWith('/admin') && !session){
    return NextResponse.redirect(new URL('/login',req.url))
 }

 return NextResponse.next()
}