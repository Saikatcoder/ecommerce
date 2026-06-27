'use client'

import ClientCatchError from '@/lib/client-catch-error'
import fetcher from '@/lib/fetcher'
import {
  Card,
  Skeleton,
  Empty,
  Select,
  Tag,
  message
} from 'antd'
import axios from 'axios'
import Image from 'next/image'
import useSWR, { mutate } from 'swr'
import {
  UserOutlined,
  CrownOutlined
} from '@ant-design/icons'

const User = () => {
  const { data, error, isLoading } = useSWR(
    '/api/user',
    fetcher
  )

  if (isLoading) {
    return (
      <div className='p-6'>
        <Skeleton active />
      </div>
    )
  }

  if (error) {
    return (
      <Empty description='Failed to load users' />
    )
  }

  const changeRole = async (
    role: string,
    userId: string
  ) => {
    try {
      await axios.put(
        `/api/user/role/${userId}`,
        { role }
      )

      message.success('Role updated successfully')
      mutate('/api/user')
    } catch (error) {
      return ClientCatchError(error)
    }
  }

  return (
    <div className='space-y-8 p-4'>

      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-slate-800'>
            Users Management
          </h1>
          <p className='text-gray-500 mt-1'>
            Manage all registered users
          </p>
        </div>

        <div className='bg-white shadow-md rounded-xl px-5 py-3 border'>
          <p className='text-gray-500 text-sm'>
            Total Users
          </p>
          <h2 className='text-2xl font-bold text-green-600'>
            {data?.length}
          </h2>
        </div>
      </div>

      {/* Users Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {data?.map((item: any) => (
          <Card
            key={item._id}
            hoverable
            className='rounded-2xl border-0 shadow-lg transition-all duration-300 hover:scale-[1.02]'
          >
            <div className='flex flex-col items-center text-center gap-4'>

              {/* Avatar */}
              <div className='relative'>
                <Image
                  alt={item.fullname}
                  width={90}
                  height={90}
                  src='/images/avatar.png'
                  priority
                  className='rounded-full object-cover border-4 border-gray-100'
                />

                <div className='absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1'>
                  {item.role === 'admin' ? (
                    <CrownOutlined />
                  ) : (
                    <UserOutlined />
                  )}
                </div>
              </div>

              {/* User Info */}
              <div>
                <h2 className='text-lg font-semibold capitalize text-slate-800'>
                  {item.fullname}
                </h2>

                <p className='text-gray-500 text-sm break-all'>
                  {item.email}
                </p>
              </div>

              {/* Role Badge */}
              <Tag
                color={
                  item.role === 'admin'
                    ? 'red'
                    : 'green'
                }
                className='capitalize px-4 py-1 text-sm rounded-full'
              >
                {item.role}
              </Tag>

              {/* Change Role */}
              <div className='w-full'>
                <Select
                  className='!w-full'
                  size='large'
                  onChange={(role: string) =>
                    changeRole(role, item._id)
                  }
                  defaultValue={item.role}
                >
                  <Select.Option value='user'>
                    User
                  </Select.Option>

                  <Select.Option value='admin'>
                    Admin
                  </Select.Option>
                </Select>
              </div>

              {/* Date */}
              <p className='text-xs text-gray-400'>
                Joined on{' '}
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default User