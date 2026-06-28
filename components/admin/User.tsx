'use client'

import ClientCatchError from '@/lib/client-catch-error'
import fetcher from '@/lib/fetcher'
import {
  Card,
  Skeleton,
  Empty,
  Select,
  Tag,
  message,
  Button,
  Popconfirm
} from 'antd'
import axios from 'axios'
import Image from 'next/image'
import useSWR, { mutate } from 'swr'
import {
  UserOutlined,
  CrownOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { useSession } from 'next-auth/react'

const User = () => {
  const { data, error, isLoading } = useSWR(
    '/api/user',
    fetcher
  )

  const session = useSession()
  const isSuperAdmin =
    session?.data?.user?.role === 'superadmin'

  if (isLoading) {
    return (
      <div className='p-6'>
        <Skeleton active />
      </div>
    )
  }

  if (error) {
    return <Empty description='Failed to load users' />
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

      message.success('Role updated')
      mutate('/api/user')
    } catch (error) {
      ClientCatchError(error)
    }
  }

  const blockUser = async (id: string) => {
    try {
      await axios.put(`/api/user/block/${id}`, {
        isBlocked: true
      })

      message.success('User blocked')
      mutate('/api/user')
    } catch (error) {
      ClientCatchError(error)
    }
  }

  const unblockUser = async (id: string) => {
    try {
      await axios.put(`/api/user/block/${id}`, {
        isBlocked: false
      })

      message.success('User unblocked')
      mutate('/api/user')
    } catch (error) {
      ClientCatchError(error)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/user/role/${id}`)

      message.success('User deleted')
      mutate('/api/user')
    } catch (error) {
      ClientCatchError(error)
    }
  }

  return (
    <div className='p-6 space-y-8'>

      {/* top */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>
            User Management
          </h1>
          <p className='text-gray-500'>
            Manage platform users
          </p>
        </div>

        <Card className='shadow-md'>
          <p>Total Users</p>
          <h2 className='text-2xl font-bold text-green-600'>
            {data?.length}
          </h2>
        </Card>
      </div>

      {/* cards */}
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {data?.map((item: any) => (
          <Card
            key={item._id}
            className='rounded-2xl shadow-lg border-0'
          >
            <div className='flex flex-col gap-4 items-center'>

              {/* avatar */}
              <div className='relative'>
                <Image
                  src='/images/avatar.png'
                  alt='avatar'
                  width={90}
                  height={90}
                  className='rounded-full border-4 border-gray-100'
                />

                <div className='absolute bottom-0 right-0 bg-black text-white p-1 rounded-full'>
                  {item.role === 'admin' ||
                  item.role === 'superadmin'
                    ? <CrownOutlined />
                    : <UserOutlined />}
                </div>
              </div>

              {/* info */}
              <div className='text-center'>
                <h2 className='font-semibold text-lg'>
                  {item.fullname}
                </h2>

                <p className='text-gray-500 text-sm'>
                  {item.email}
                </p>
              </div>

              {/* role */}
              <Tag
                color={
                  item.role === 'superadmin'
                    ? 'gold'
                    : item.role === 'admin'
                    ? 'red'
                    : 'green'
                }
              >
                {item.role}
              </Tag>

              {/* blocked status */}
              <Tag
                color={
                  item.isBlocked ? 'red' : 'blue'
                }
              >
                {item.isBlocked
                  ? 'Blocked'
                  : 'Active'}
              </Tag>

              {/* role change */}
              {isSuperAdmin &&
                item.role !== 'superadmin' && (
                  <Select
                    className='w-full'
                    defaultValue={item.role}
                    onChange={(role) =>
                      changeRole(role, item._id)
                    }
                  >
                    <Select.Option value='user'>
                      User
                    </Select.Option>

                    <Select.Option value='admin'>
                      Admin
                    </Select.Option>
                  </Select>
                )}

              {/* actions */}
              {isSuperAdmin && (
                <div className='flex gap-2 w-full'>

                  {!item.isBlocked ? (
                    <Button
                      danger
                      icon={<StopOutlined />}
                      onClick={() =>
                        blockUser(item._id)
                      }
                      className='flex-1'
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      type='primary'
                      icon={<CheckCircleOutlined />}
                      onClick={() =>
                        unblockUser(item._id)
                      }
                      className='flex-1'
                    >
                      Unblock
                    </Button>
                  )}

                  <Popconfirm
                    title='Delete permanently?'
                    onConfirm={() =>
                      deleteUser(item._id)
                    }
                  >
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                </div>
              )}

              <p className='text-xs text-gray-400'>
                Joined{' '}
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