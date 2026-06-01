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