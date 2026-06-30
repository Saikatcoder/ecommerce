import mongoose from "mongoose";
import dns from  'dns'
const db = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(db)
dns.setServers(["1.1.1.1","8.8.8.8"])

import ServerCatchError from "@/lib/server-catch-error";
import { NextRequest , NextResponse as res } from "next/server";
import UserModel from "@/models/user.model";

export const POST = async (req: NextRequest ,)=>{
    try{
     
       const body = await req.json()
       await UserModel.create(body)
       return res.json({message:'signup Sucess'})
      
       
    }catch(err){
        return ServerCatchError(err)
    }
}