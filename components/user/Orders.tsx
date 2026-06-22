'use client'

import {
  Button,
  Card,
  Empty,
  Skeleton,
  Tag
} from 'antd'
import Image from 'next/image'
import {
  EyeOutlined,
  TruckOutlined
} from '@ant-design/icons'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import moment from 'moment'

const Order = () => {
  const { data, error, isLoading } = useSWR('/api/order', fetcher)

  if (isLoading) return <Skeleton active />

  if (error || !data?.length)
    return (
      <div className='min-h-[60vh] flex justify-center items-center'>
        <Empty description='No Orders Found' />
      </div>
    )

  console.log(data)

  return (
    <div className='space-y-6 max-h-[85vh] overflow-y-auto pr-2'>

      {/* Heading */}
      <div>
        <h1 className='text-3xl font-bold text-slate-800'>
          My Orders
        </h1>
        <p className='text-gray-500 mt-1'>
          Track all your purchased products
        </p>
      </div>

      {/* Orders */}
      {data.map((item: any, index: number) => {
       
        <Card
          key={index}
          className='rounded-2xl shadow-md border-0'
          title={
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
              <span className='font-semibold text-lg'>
                Order ID: #{item.orderId}
              </span>

              <Tag color='blue'>
                {item.status}
              </Tag>
            </div>
          }
          extra={
            <label className='text-gray-500 text-xs sm:text-sm'>
              {moment(item.createdAt).format(
                'MMM DD, YYYY hh:mm A'
              )}
            </label>
          }
        >
          {/* Products wrapper */}
          <div className='space-y-4 max-h-[400px] overflow-y-auto pr-2'>

            {item.products.map(
              (product: any, productIndex: number) => (
                 
                <Card
                  key={productIndex}
                  hoverable
                  className='rounded-xl border border-gray-100 shadow-sm'
                  bodyStyle={{ padding: 16 }}
                >
                  <div className='flex flex-col md:flex-row gap-4 justify-between'>

                    {/* Left section */}
                    <div className='flex gap-4'>

                      <div className='relative w-[90px] h-[90px] rounded-xl overflow-hidden bg-slate-100 shrink-0'>
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className='object-cover'
                        />
                      </div>

                      <div className='space-y-2'>
                        <h2 className='font-semibold text-lg text-slate-800'>
                          {product.title}
                        </h2>

                        <p className='text-gray-500 text-sm line-clamp-2'>
                          {product.description}
                        </p>

                        <div className='flex gap-3 items-center flex-wrap'>
                          <span className='text-green-600 font-bold text-lg'>
                            ₹{product.prices}
                          </span>

                          <Tag color='orange'>
                            {product.discount}% OFF
                          </Tag>
                          <label className='text-green-500'>{item.quantities[productIndex]}PCS</label>
                        </div>
                      </div>
                    </div>

                    {/* Right section */}
                    <div className='flex flex-col md:items-end justify-between gap-3'>

                      <div className='flex gap-2 flex-wrap'>
                        <Button
                          icon={<TruckOutlined />}
                        >
                          Track
                        </Button>

                        <Button
                          type='primary'
                          icon={<EyeOutlined />}
                          className='!bg-green-500'
                        >
                          Details
                        </Button>
                      </div>
                    </div>

                  </div>
                </Card>
              )
            )}
          </div>
        </Card>
})}
    </div>
  )
}

export default Order