import mongoose, { model, models, Schema } from "mongoose";
import UserModel from "./user.model";
import OrderModel from "./order.model";

const paymentSchema = new Schema({
    user:{
        type :mongoose.Types.ObjectId,
        ref:UserModel,
        required :true,
    },
    order :{
        type:mongoose.Types.ObjectId,
        ref:OrderModel,
        required:true
    },
  paymentId :{
    type:String,
    required:true
  },
  vendor:{
    type:String,
    default :'razorpay',
    enum : ['razorpay','stripe']
  }
},{timestamps:true})


const PaymentModel =models.order ||  model('payment',paymentSchema)
export default PaymentModel