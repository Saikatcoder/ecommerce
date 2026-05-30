'use client'

import Link from 'next/link'
import {
  Button,
  Card,
} from 'antd'
import {
  CloseCircleFilled,
  HomeOutlined,
  LoginOutlined,
} from '@ant-design/icons'
import Logo from '@/components/shared/logo'

export default function AuthFailed() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4'>

      <Card
        className='w-full max-w-md rounded-3xl shadow-2xl border-0 text-center animate__animated animate__fadeIn'
        styles={{
          body: {
            padding: 35,
          },
        }}
      >
        {/* Logo */}
        <div className='flex justify-center items-center gap-2 mb-6'>
          <Logo />
          <h2 className='text-3xl font-light text-slate-700'>
            Ecom
          </h2>
        </div>

        {/* Error Icon */}
        <CloseCircleFilled className='!text-red-500 !text-6xl mb-4' />

        {/* Heading */}
        <h1 className='text-3xl font-bold text-slate-800'>
          Login Failed
        </h1>

        {/* Message */}
        <p className='text-slate-500 mt-3 leading-7'>
          Google authentication failed or was cancelled.
          Please try again or return to login.
        </p>

        {/* Buttons */}
        <div className='flex flex-col gap-3 mt-7'>

          <Link href='/login'>
            <Button
              type='primary'
              size='large'
              block
              icon={<LoginOutlined />}
              className='!bg-red-500 hover:!bg-red-600 !rounded-xl !h-[46px]'
            >
              Back To Login
            </Button>
          </Link>

          <Link href='/'>
            <Button
              size='large'
              block
              icon={<HomeOutlined />}
              className='!rounded-xl !h-[46px]'
            >
              Go Home
            </Button>
          </Link>

        </div>
      </Card>
    </div>
  )
}