'use client'

import {
  Button,
  Card,
  Empty,
  Tag
} from 'antd'
import Image from 'next/image'
import {
  EyeOutlined,
  TruckOutlined
} from '@ant-design/icons'

const Order = () => {

  const orders = [
    {
      id: 1,
      title: 'Yellow Shirt',
      image: '/products/fb8b3222-8d56-407d-abc7-45eb2bc95440.png',
      price: 1700,
      quantity: 2,
      status: 'Pending',
      date: '22 May 2026'
    },
    {
      id: 2,
      title: 'Black Kurti',
      image: '/products/7429391c-a3f6-4f96-bcec-15541b4891aa.jpeg',
      price: 2000,
      quantity: 1,
      status: 'Delivered',
      date: '18 May 2026'
    }
  ]

  if (!orders.length)
    return (
      <div className='min-h-[60vh] flex justify-center items-center'>
        <Empty description='No Orders Found' />
      </div>
    )

  return (
    <div className='space-y-6'>

      {/* Heading */}
      <div className='flex justify-between items-center flex-wrap gap-3'>

        <div>
          <h1 className='text-3xl font-bold text-slate-800'>
            My Orders
          </h1>

          <p className='text-slate-500 mt-1'>
            Track and manage your orders
          </p>
        </div>

        <Tag
          color='blue'
          className='!px-4 !py-1'
        >
          {orders.length} Orders
        </Tag>
      </div>

      {/* Orders */}
      <div className='flex flex-col gap-5'>

        {orders.map((item) => (
          <Card
            key={item.id}
            className='rounded-3xl shadow-sm hover:shadow-lg transition border-0'
            styles={{
              body: {
                padding: 20
              }
            }}
          >

            <div className='flex flex-col md:flex-row gap-5 md:items-center justify-between'>

              {/* Left */}
              <div className='flex gap-4'>

                <div className='relative w-[90px] h-[90px] rounded-2xl overflow-hidden bg-slate-100 shrink-0'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover'
                  />
                </div>

                <div className='space-y-2'>
                  <h2 className='text-lg font-semibold text-slate-800'>
                    {item.title}
                  </h2>

                  <p className='text-slate-500 text-sm'>
                    Quantity : {item.quantity}
                  </p>

                  <h3 className='text-xl font-bold text-green-500'>
                    ₹{item.price}
                  </h3>

                  <p className='text-xs text-slate-400'>
                    Ordered on {item.date}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className='flex flex-col md:items-end gap-3'>

                <Tag
                  color={
                    item.status === 'Delivered'
                      ? 'green'
                      : item.status === 'Cancelled'
                      ? 'red'
                      : 'orange'
                  }
                  className='!px-3 !py-1 !rounded-full'
                >
                  {item.status}
                </Tag>

                <div className='flex gap-3 flex-wrap'>

                  <Button
                    icon={<TruckOutlined />}
                  >
                    Track Order
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
        ))}
      </div>
    </div>
  )
}

export default Order