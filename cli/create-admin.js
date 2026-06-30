const log = console.log

import dotenv from 'dotenv'
dotenv.config()

import chalk from 'chalk'
import inquirer from 'inquirer'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import dns from 'dns'
dns.setServers(["1.1.1.1", "8.8.8.8"])
/* =========================
   Role Select Options
========================= */

const promptOptions = [
  {
    type: 'select',
    name: 'role',
    message: 'Press arrow up and down key to choose role.',
    choices: [
      chalk.green('user'),
      chalk.blue('SuperAdmin'),
      chalk.blue('Admin'),
      chalk.red('Exit')
    ]
  }
]

/* =========================
   Validations
========================= */

const requiredValidation = (input, name) => {
  if (input.trim().length > 0)
    return true

  return `${name} is required`
}

const emailValidation = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (regex.test(email))
    return true

  return 'Please enter a valid email'
}

const passwordValidation = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/

  if (regex.test(password))
    return true

  return 'Password must contain uppercase, lowercase, number & special character'
}



const inputOptions = [
  {
    type: 'input',
    name: 'fullname',
    message: 'Enter Your fullname ?',
    validate: (input) => {
      return requiredValidation(input, 'fullname')
    }
  },

  {
    type: 'input',
    name: 'email',
    message: 'Enter Your email ?',
    validate: (input) => {
      const required = requiredValidation(
        input,
        'email'
      )

      if (required !== true)
        return required

      return emailValidation(input)
    }
  },

  {
    type: 'password',
    name: 'password',
    mask: '*',
    message: 'Enter Your password ?',
    validate: (input) => {
      const required = requiredValidation(
        input,
        'password'
      )

      if (required !== true)
        return required

      return passwordValidation(input)
    }
  }
]

const createRole = async (role,db) => {
  try {
    const input =
      await inquirer.prompt(
        inputOptions
      )

    input.password =
      await bcrypt.hash(
        input.password,
        12
      )

    input.role = role
    input.createdAt =
      new Date()
    input.updatedAt =
      new Date()
    input.__v = 0

    const User =
      db.collection('users')

    await User.insertOne(
      input
    )

    log(
      chalk.green(
        `${role} has been created`
      )
    )

    process.exit()
  } catch (error) {
    log(chalk.red(`❌ Signup failed - ${error.message}`))
    process.exit()
  }
}

/* =========================
   Exit
========================= */

const exitApp = () => {
  log(chalk.red('Thanks for using this app. GOODBYE 👋'))
  process.exit()
}

/* =========================
   Welcome
========================= */

const welcome = async (db) => {
  log(chalk.bgRed.white.bold('⭐ Admin Signup Console ⭐'))

  const { role } =
    await inquirer.prompt(promptOptions)

  if (role.includes('user'))
    return createRole('user',db)

  if (role.includes('SuperAdmin'))
    return createRole('superadmin',db)

  if (role.includes('Admin'))
    return createRole('admin',db)

  if (role.includes('Exit'))
    return exitApp()
}

/* =========================
   Main
========================= */

const main = async () => {
  MongoClient.connect(
    process.env.DB_URL
  )
    .then(
      (connection) => {
        const db =
          connection.db(
            process.env.DB_NAME
          )

        welcome(db)
      }
    )
    .catch(() => {
      log(
        chalk.redBright(
          '❌ Failed to connect database'
        )
      )
      process.exit()
    })
}

main()