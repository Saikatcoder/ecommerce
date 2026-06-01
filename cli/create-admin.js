const log = console.log

import dotenv from 'dotenv'
dotenv.config()
import chalk from 'chalk'
import inquirer from 'inquirer'
import {MongoClient} from 'mongodb'
import bcrypt from 'bcrypt'



const promptOptions =[{
    type:'select',
    name: 'role',
    message: 'Press arrow up and down key to choose role.',
    choices:[
       chalk.green("user"),
       chalk.blue("Admin"),
      chalk.red( "Exit")
    ]
}]

const requiredValidation =(input, name)=>{
    if(input.length >0 )
        return true

    return log(chalk.red (`${name}is required`))
}

const emailValidation = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid =  regex.test(email)

    if(isValid)
        return true

    return log(chalk.red(`please enate a valid email `))
}

const passwordValidation = (password) => {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    const isValid = regex.test(password)

    if(isValid)
        return true

    return log(chalk.red(`Password must contain uppercase, lowercase, number & special character`))
}


const inputOptions =[
    {
        type :'input',
        name: "fullname",
        message:"Enter Your fullname ?",
        validate : (input)=>{
          return requiredValidation(input,"fullname")
        }
    },
    {
        type :'input',
        name: "email",
        message:"Enter Your email ?",
         validate : (input)=>{
          return requiredValidation(input,"email"),
          emailValidation(input)
        }
    },
    {
        type :'input',
        name: "password",
        mask : "*",
        message:"Enter Your password ?",
         validate: (input)=>{
            requiredValidation(input, 'password')
            passwordValidation(input)
         }
    }
]


const creatRole =async (role,db)=>{
 try {
    const input = await inquirer.prompt(inputOptions)
    input.password = await bcrypt.hash(input.password,12)
    input.role = role
    input.createAt = new Date()
    input.updateAt = new Date()
    input.__v =0
    const User = db.collection('users')
    await User.insertOne(input)
    log(chalk.green(`${role} has been created`))
    process.exit()
 } catch (error) {
    log(chalk.red(`Signup failed -${error.message}`))
     process.exit()
 }
}

const exitApp = ()=>{
 log(chalk.red("thanks for visit this app. GOODBY "))
  process.exit()
}


const welcome = async (db)=>{
 log(chalk.bgRed.white.bold("⭐ Admin Signup console ⭐"))
 const {role} = await inquirer.prompt(promptOptions)

 if(role.includes("user"))
    return creatRole('user',db)

 if(role.includes("Admin"))
    return creatRole('admin',db)

 if(role.includes("Exit"))
    return exitApp()

}

const main = async ()=>{

MongoClient.connect(process.env.DB_URL)
.then((connection)=>{
  const db = connection.db(process.env.DB_NAME)
  welcome(db)
})
.catch(()=>{
    log(chalk.redBright("Failed to connected database "))
     process.exit()
})

 
}

main()