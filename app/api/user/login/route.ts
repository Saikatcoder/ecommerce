import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import UserModel from "@/models/user.model";
import bcrypt from 'bcrypt'
import ServerCatchError from "@/lib/server-catch-error";
import { NextRequest , NextResponse as res } from "next/server";



export const POST= async(req:NextRequest)=>{
    try {
        const body = await req.json()
        const email = body.email
        const password = body.password
        const provider = body.provider
       const user = await UserModel.findOne({email})
        
           const payload = {
            id : user._id,
            name: user.fullname,
            email : user.email,
            gender:'male'
        }
          
        if(!user)
          return res.json({message:"User not found"},{status:404})
        

        if(provider === 'google')
           return res.json(payload)

       const isLogin = await bcrypt.compare(password ,user.password)

        if(!isLogin)
            return res.json({message :'Incorrect passwrod'},{status:401}) 

     
       return res.json(payload,{status:200})

    } catch (error) {
        ServerCatchError(error)
    }
}



