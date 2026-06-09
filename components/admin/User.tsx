'use client'

import fetcher from '@/lib/fetcher'
import { Card, Skeleton, Empty } from 'antd'
import Image from 'next/image'
import useSWR from 'swr'

const User = () => {
  const {data,error,isLoading } = useSWR('/api/user', fetcher)

  if (isLoading) {
    return (
      <Skeleton
        active
        className='w-full'
      />
    )
  }

  if (error) {
    return (
      <Empty description='Failed to load users' />
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      {data?.map((user: any) => (
        <Card
          key={user._id}
          hoverable
        >
          <div className='flex flex-col items-center gap-4'>
            <Image
              alt={user.fullname}
              width={100}
              height={100}
              src='/images/avatar.png'
              priority
              className='rounded-full object-cover'
            />

            <Card.Meta
              title={user.fullname}
              description={user.email}
            />

            <label className='text-gray-400 text-sm'>
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </label>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default User