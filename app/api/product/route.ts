import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import {v4 as uuid} from 'uuid'
import ServerCatchError from "@/lib/server-catch-error";
import ProductModel from "@/models/product.model";
import  fs from "fs";
import { NextRequest ,NextResponse as res } from "next/server";
import path from "path";


export const POST = async(req: NextRequest)=>{
    try {
        const body = await req.formData()  
        const file= body.get('image') as File | null

        if(!file){
            return res.json({
                message: 'product images not uploaded'
            },{
                status:404
            })
        }
        
       const bytes = await file.arrayBuffer()
       const buffer = Buffer.from(bytes)
       const rootPath = process.cwd()
       const folder = path.join(rootPath, 'public', 'products')
       const fileName = `${uuid()}.png`
       const filePath = path.join(folder,fileName)

       fs.writeFileSync(filePath , buffer)

       const payload = {
         title: body.get('title'),
         description: body.get('description'),
         price: body.get('price'),
         discount: body.get('discount'),
         image: `/products/${fileName}`,
       }
       
       const productModel = await ProductModel.create(payload)

        return res.json(productModel)

    } catch (error) {
        ServerCatchError(error)
    }
}



export const GET = async(req: NextRequest)=>{
    try {
        const products = await ProductModel.find()
        
        return res.json(products)

    } catch (error) {
        ServerCatchError(error)
    }
}