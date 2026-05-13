'use client'

import { Card, Skeleton } from 'antd'
import Image from 'next/image'

const User = () => {
  return (
    <div className='grid lg:grid-cols-4 gap-8'>
      <Skeleton active className='col-span-4'/>
      {
        Array(16).fill(0).map((item,index)=>(
          <Card key={index} hoverable>
            <div className='flex flex-col items-center gap-6'>
              <Image 
              alt={`avt-${index}`} 
              width={100}
              height={100}
              src='/images/avatar.png'
              priority
              className='rounded-full '
              objectFit='cover'
              />
              <Card.Meta
              title="saikat Dutta" 
              description='saikat@gmail.com'/>
            <label className='text-gray-300 font-medium '>jsn 3 2026</label>
            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default User
