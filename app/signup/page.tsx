import Signup from '@/components/Signup'
import React from 'react'

export const metadata ={
  title: `Login - Ecart`,
  description : 'Signin or register your new ecart account',
  keywords: "ecart, ecart login , ecart signin, ecart account login",
  openGraph:{
    title:`Ecart - ${process.env.DOMAIN}`,
    description : 'Signin or login with your ecart account',
    url:`${process.env.SERVER}/login`,
    siteName : 'Ecart',
    images: [
      {
        url :"/images/logo.webp" ,
      },
    ],
    locale: "en_US",
    type: "website"
  }
}


const SignupRouter = () => {
  return (
    <Signup/>
  )
}

export default SignupRouter
