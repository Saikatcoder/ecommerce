'use client'

import {
  Button,
  Card,
  Divider,
  Form,
  Input,
} from 'antd'
import Image from 'next/image'
import Logo from './shared/logo'
import {
  UserAddOutlined,
  GoogleOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { getSession, signIn } from 'next-auth/react'
import ClientCatchError from '@/lib/client-catch-error'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const Login = () => {
const [loading, setLoading] = useState(false)

const router = useRouter()

  const login = async (value: any) => {
   try {
    setLoading(true)
      const payload ={
      ...value,
      redirect: false,
    }
   await signIn('credentials',payload)
  const session = await getSession()

  if(!session)
    throw new Error("failed to login user")

  if(session.user.role === 'user')
   return router.replace('/')

  
  if(session.user.role === 'admin')
   return router.replace('/admin/orders')

  

   } catch (error) {
    ClientCatchError(error)
  }
  finally{
    setLoading(false)
  }
  }


  const signInwithGoogle = async()=>{
    try {
      const payload ={
        redirect: true,
        callbackUrl :'/'
      }

     const res = await signIn('google',payload)
     console.log(res)
    } catch (error) {
      ClientCatchError(error)
    }
  }

  return (
    <div className='min-h-screen bg-slate-100 grid grid-cols-1 lg:grid-cols-2 animate__animated animate__fadeIn overflow-hidden'>

      {/* Left Image */}
      <div className='relative hidden lg:block'>
        <Image
          className='object-cover'
          src='/images/avatar.png'
          fill
          alt='login'
          sizes='50vw'
          priority
        />

        <div className='absolute inset-0 bg-black/40 flex items-center justify-center text-white p-10'>
          <div>
            <h1 className='text-5xl font-bold mb-4'>
              Welcome Back
            </h1>

            <p className='text-lg text-slate-200 max-w-md'>
              Login to continue shopping and explore our latest collection.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex items-center justify-center px-4 py-10 bg-gradient-to-br from-amber-100 to-orange-100'>

        <Card
          className='w-full max-w-md rounded-3xl shadow-2xl border-0 animate__animated animate__slideInRight'
          styles={{
            body: {
              padding: 32,
            },
          }}
        >

          {/* Logo */}
          <div className='flex justify-center items-center gap-2 mb-6'>
            <Logo />
            <h2 className='text-3xl font-semibold text-slate-800'>
              Ecom
            </h2>
          </div>

          {/* Heading */}
          <div className='text-center mb-6'>
            <h1 className='text-3xl font-bold text-slate-800'>
              Login Account
            </h1>

            <p className='text-slate-500 mt-2'>
              Welcome back to your account
            </p>
          </div>

          {/* Form */}
          <Form
            layout='vertical'
            onFinish={login}
          >

            <Form.Item
              label={
                <span className='text-sm font-medium text-slate-500'>
                  Email
                </span>
              }
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Enter valid email',
                },
              ]}
              name='email'
            >
              <Input
                size='large'
                placeholder='email@example.com'
                className='!rounded-xl'
              />
            </Form.Item>

            <Form.Item
              label={
                <span className='text-sm font-medium text-slate-500'>
                  Password
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Enter password',
                },
              ]}
              name='password'
            >
              <Input.Password
                size='large'
                placeholder='password'
                className='!rounded-xl'
              />
            </Form.Item>

            <Form.Item className='!mb-3'>
              <Button
              loading={loading}
                htmlType='submit'
                size='large'
                type='primary'
                block
                icon={<UserAddOutlined />}
                className='!bg-green-500 !rounded-xl !h-[48px]'
              >
                Login
              </Button>
            </Form.Item>

          </Form>

          <Divider className='!text-slate-400'>
            OR
          </Divider>

          {/* Google */}
          <Button
            block
            size='large'
            icon={<GoogleOutlined />}
            className='rounded-xl! h-12!'
            onClick={signInwithGoogle}
          >
            Sign in With Google
          </Button>

          {/* Signup */}
          <div className='flex flex-wrap justify-center gap-2 mt-6 text-sm'>
            <p className='text-slate-500'>
              Don&apos;t have an account?
            </p>

            <Link
              href='/signup'
              className='text-green-500 font-semibold'
            >
              Sign up
            </Link>
          </div>

        </Card>
      </div>
    </div>
  )
}

export default Login