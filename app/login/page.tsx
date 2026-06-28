import Login from '@/components/Login'


export const metadata ={
  title: `Login - Ecart`,
  description : 'Signin or login with your ecart account',
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


const LoginRouter = () => {
  return (
    <Login/>
  )
}

export default LoginRouter
