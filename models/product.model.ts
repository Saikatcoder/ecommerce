import { model, models, Schema } from "mongoose";


const productSchema = new Schema({
image :{
 type:String,
 require :true,
},
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
prices:{
    type:Number,
    required:true
},
quantity:{
  type : Number,
  required: true
},
discount:{
    type:Number,
    rquired:true,
    default :0
},
slug:{
    type:String
}
},{timestamps:true})

productSchema.pre('save', function(){
    this.slug =this.title.toLocaleLowerCase().split(" ").join("-")
})


const ProductModel = models.product || model('product', productSchema)
export default ProductModel