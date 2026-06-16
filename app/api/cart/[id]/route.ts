import mongoose from "mongoose";
const db = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(db)


import IdInterface from "@/interface/id.interface";
import serverCatchError from "@/lib/server-catch-error";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import CartModel from "@/models/cart.model";


export const PUT = async (req: NextRequest, context: IdInterface)=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session)
            return res.json({message: 'Unauthorized'}, {status: 401})

        if(session.user.role !== "user")
            return res.json({message: 'Unauthorized'}, {status: 401})

        const {id} = await context.params
        const body = await req.json()
console.log("Received ID:", id)
        let cart = null

        if(body.qnt > 0)
           cart = await CartModel.findByIdAndUpdate(id, {qnt: body.qnt}, {new: true})

        else 
          cart = await CartModel.findByIdAndDelete(id) 

        if(!cart)
            return res.json({message: 'Cart not found'}, {status: 404})


        return res.json(cart)
    }
    catch(err)
    {
        return serverCatchError(err)
    }
}




export const DELETE = async (req: NextRequest, context: IdInterface)=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session)
            return res.json({message: 'Unauthorized'}, {status: 401})

        if(session.user.role !== "user")
            return res.json({message: 'Unauthorized'}, {status: 401})

        const {id} = await context.params
        const cart = await CartModel.findByIdAndDelete(id)

        if(!cart)
            return res.json({message: 'Cart not found'}, {status: 404})

        return res.json(cart)
    }
    catch(err)
    {
        return serverCatchError(err)
    }
}