
import mongoose, { model, models, Schema } from "mongoose";
import UserModel from "./user.model";
import ProductModel from "./product.model";

const cartSchema = new Schema({
 user:{
    type:mongoose.Types.ObjectId,
    ref:UserModel,
    required:true
 },
 product:{
    type:mongoose.Types.ObjectId,
    ref:ProductModel,
    required:true
 },
qunt:{
    type:Number,
    default:1
    },
},{timestamps:true})


const CartModel = models.Cart || model('Cart',cartSchema)
export default CartModel