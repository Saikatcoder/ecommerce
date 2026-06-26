'use client'

import {
  Button,
  Card,
  Empty,
  Skeleton,
  Tag,
  Divider
} from 'antd'
import Image from 'next/image'
import {
  EyeOutlined,
  ShopOutlined,
  TruckOutlined
} from '@ant-design/icons'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import moment from 'moment'
import priceClaculate from '@/lib/priceCalculate'
import Link from 'next/link'

const Order = () => {
  const { data, error, isLoading } = useSWR('/api/order', fetcher)

  if (isLoading) return <Skeleton active />

  if (error || !data?.length)
    return (
      <div className='min-h-[70vh] flex justify-center items-center flex-col'>
        <Empty description='No Orders Found' />
        <Link href='/'>
        <Button type='primary' icon={<ShopOutlined/>}>Shop Now</Button>
        </Link>
      </div>
    )

  const calculateOrderTotal = (item: any) => {
    let sum = 0

    for (let i = 0; i < item.prices.length; i++) {
      const amount = priceClaculate(
        item.prices[i],
        item.discounts[i]
      )

      sum += amount * item.quantities[i]
    }

    return sum
  }

  const totalPrice = () => {
    let sum = 0

    for (let item of data) {
      sum += calculateOrderTotal(item)
    }

    return sum
  }

  const getStatusColor = (status: string) => {
    if (status === 'delivered') return 'green'
    if (status === 'cancelled') return 'red'
    if (status === 'shipped') return 'blue'
    return 'orange'
  }

  return (
    <div className='h-[85vh] flex flex-col gap-6'>

      {/* Header */}
      <div className='flex justify-between items-center flex-wrap gap-3 px-2'>
        <div>
          <h1 className='text-3xl font-bold text-slate-800'>
            My Orders
          </h1>

          <p className='text-gray-500 mt-1'>
            Track and manage all your purchases
          </p>
        </div>

      </div>

      {/* Scrollable orders section */}
      <div className='flex-1 overflow-y-auto pr-3 space-y-5'>

        {data.map((item: any, index: number) => (

          <Card
            key={index}
            className='rounded-2xl shadow-md border-0'
          >

            {/* Order header */}
            <div className='flex flex-col lg:flex-row justify-between gap-3 mb-5'>

              <div>
                <h2 className='text-lg font-semibold'>
                  Order #{item.orderId}
                </h2>

                <p className='text-gray-500 text-sm mt-1'>
                  {moment(item.createdAt).format(
                    'DD MMM YYYY, hh:mm A'
                  )}
                </p>
              </div>

              <div className='flex items-center gap-4 flex-wrap'>

                <Tag
                  color={getStatusColor(item.status)}
                  className='px-3 py-1 rounded-full'
                >
                  {item.status.toUpperCase()}
                </Tag>

                <div className='text-right'>
                  <p className='text-gray-400 text-sm'>
                    Order Total
                  </p>

                  <h2 className='font-bold text-xl text-green-600'>
                    ₹{item.grossTotal}
                  </h2>
                </div>
              </div>
            </div>

            <Divider />

            {/* Products scroll */}
            <div className='max-h-[350px] overflow-y-auto pr-2 space-y-4'>

              {item.products.map(
                (product: any, productIndex: number) => {

                  const finalPrice = priceClaculate(
                    item.prices[productIndex],
                    item.discounts[productIndex]
                  )

                  return (
                    <Card
                      key={productIndex}
                      hoverable
                      className='rounded-xl border border-gray-100'
                      bodyStyle={{ padding: 14 }}
                    >
                      <div className='flex flex-col md:flex-row justify-between gap-5'>

                        {/* Product left */}
                        <div className='flex gap-4'>

                          <div className='relative w-[100px] h-[100px] rounded-xl overflow-hidden shrink-0 bg-gray-100'>
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className='object-cover'
                            />
                          </div>

                          <div className='space-y-2'>

                            <h3 className='font-semibold text-lg'>
                              {product.title}
                            </h3>

                            <p className='text-gray-500 text-sm line-clamp-2 max-w-[450px]'>
                              {product.description}
                            </p>

                            <div className='flex flex-wrap gap-3 items-center'>

                              <span className='text-green-600 font-bold'>
                                ₹{finalPrice}
                              </span>

                              <del className='text-gray-400'>
                                ₹{item.prices[productIndex]}
                              </del>

                              <Tag color='orange'>
                                {item.discounts[productIndex]}% OFF
                              </Tag>

                              <Tag color='cyan'>
                                Qty: {item.quantities[productIndex]}
                              </Tag>
                            </div>
                          </div>
                        </div>

                        {/* Product right */}
                        <div className='flex flex-col justify-between items-end gap-3'>

                          {/* Individual product state */}
                          <Tag
                            color={getStatusColor(item.status)}
                            className='rounded-full px-3'
                          >
                            {item.status}
                          </Tag>

                          <div className='flex gap-2 flex-wrap'>
                            <Button icon={<TruckOutlined />}>
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
                }
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Order