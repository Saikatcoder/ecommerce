import { NextRequest, NextResponse as res } from "next/server";
import fs from 'fs'
import ServerCatchError from "@/lib/server-catch-error";
import crypto from 'crypto'

export const POST = (req:NextRequest)=>{
   try {
    const signature = req.headers.get('x-razorpay-signature')
    
    if(!signature)
        return res.json({message:'Invalid signature'},{status:400})

     const body = req.json()

    const mySignature = crypto.createHmac('sha256',process.env.RAZORPAY_WEBHOOK_SECRET! )
    .update(JSON.stringify(body))
    .digest('hex')

    if(signature !== mySignature)
        return res.json({message:'Invalid signature'},{status:400})

    fs.writeFileSync('test.json',JSON.stringify(body,null, 2))
    console.log("Request Recived")
   } catch (error) {
    return ServerCatchError(error)
   }
}

