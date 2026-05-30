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
  GoogleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import ClientCatchError from '@/lib/client-catch-error'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Signup = () => {

  const router = useRouter()

  const signup = async (value: any) => {
    try {
      await axios.post('/api/user/signup', value)
      router.push('/login')
    } catch (err) {
      ClientCatchError(err)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 grid grid-cols-1 lg:grid-cols-2 animate__animated animate__fadeIn overflow-hidden'>

      {/* Left Image Section */}
      <div className='relative hidden lg:block'>
        <Image
          className='object-cover'
          src='/images/avatar.png'
          fill
          alt='signup'
          sizes='50vw'
          priority
        />

        {/* Overlay */}
        <div className='absolute inset-0 bg-black/40 flex items-center px-12'>
          <div className='text-white'>

            <div className='flex items-center gap-3'>
              <Logo />
              <h2 className='text-3xl font-light'>
                Ecom
              </h2>
            </div>

            <h1 className='text-5xl font-bold mt-5 leading-tight'>
              Join Our Store
            </h1>

            <p className='mt-3 text-lg text-gray-200 max-w-md'>
              Create your account and enjoy secure shopping with our newest collection.
            </p>

          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex items-center justify-center bg-amber-100 px-4 py-8'>

        <Card
          className='w-full max-w-[480px] rounded-3xl shadow-2xl border-0 animate__animated animate__slideInRight'
          styles={{
            body: {
              padding: 32,
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

          {/* Heading */}
          <div className='text-center mb-6'>
            <h2 className='text-3xl font-bold text-slate-800'>
              Create Account
            </h2>

            <p className='text-slate-500 mt-2'>
              Signup to continue shopping
            </p>
          </div>

          {/* Form */}
          <Form
            layout='vertical'
            onFinish={signup}
          >

            {/* Name */}
            <Form.Item
              label={
                <label className='text-lg font-medium text-gray-500'>
                  Name
                </label>
              }
              rules={[{ required: true }]}
              name='fullname'
            >
              <Input
                size='large'
                placeholder='Enter name'
                className='!rounded-xl'
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label={
                <label className='text-lg font-medium text-gray-500'>
                  Email
                </label>
              }
              rules={[
                {
                  required: true,
                  type: 'email',
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

            {/* Password */}
            <Form.Item
              label={
                <label className='text-lg font-medium text-gray-500'>
                  Password
                </label>
              }
              rules={[{ required: true }]}
              name='password'
            >
              <Input.Password
                size='large'
                placeholder='Password'
                className='!rounded-xl'
              />
            </Form.Item>

            {/* Signup Button */}
            <Form.Item className='!mb-2'>
              <Button
                htmlType='submit'
                size='large'
                type='primary'
                block
                icon={<UserAddOutlined />}
                className='!bg-green-500 hover:!bg-green-600 !rounded-xl !h-[48px]'
              >
                Signup
              </Button>
            </Form.Item>

          </Form>

          <Divider />

          {/* Google Signup */}
          <Button
            block
            size='large'
            icon={<GoogleOutlined />}
            className='!rounded-xl !h-[48px]'
          >
            Signup With Google
          </Button>

          {/* Login Link */}
          <div className='flex justify-center gap-2 mt-5 flex-wrap'>
            <p className='text-gray-500'>
              Already have an Account?
            </p>

            <Link
              href='/login'
              className='text-green-500 font-medium hover:underline'
            >
              Login
            </Link>
          </div>

        </Card>
      </div>
    </div>
  )
}

export default Signup