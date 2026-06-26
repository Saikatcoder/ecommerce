import mongoose from "mongoose";
const db = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(db)

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
        
       if(!user)
        return res.json({message:"User not found"},{status:404})
       
       const payload = {
           id : user._id,
           name: user.fullname,
           email : user.email,
           role:user.role,
           address:user.address
        }
          
        

        if(provider === 'google')
           return res.json(payload)

       const isLogin = await bcrypt.compare(password ,user.password)

        if(!isLogin)
            return res.json({message :'Incorrect passwrod'},{status:401}) 

     
       return res.json(payload,{status:200})

    } catch (error) {
       return ServerCatchError(error)
    }
}



