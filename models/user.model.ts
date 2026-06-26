import { model, Schema, models} from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    fullname: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    role :{
      type : String
    },
    address:{
      street:{type:String, default:null},
      city:{type:String, default:null},
      state:{type:String, default:null},
      country:{type:String, default:null},
      pincode:{type:Number, default:null}
    }
},{timestamps:true})

// for every role is user
userSchema.pre('save',function(){
 this.role ='user'
 
})

userSchema.pre('save', async function () {
  if (!this.password) {
    return
  }
  if (!this.isModified('password')) {
    return
  }
  this.password = await bcrypt.hash(
    this.password,
    12
  )
})


const UserModel = models.user || model('user',userSchema)
export default UserModel