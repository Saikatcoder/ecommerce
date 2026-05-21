'use client'

import DataInterface from '@/interface/data.interface'
import {
  Button,
  Card,
  Empty,
  Tag,
} from 'antd'
import {
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import { FC } from 'react'

const Products: FC<DataInterface> = ({data}) => {
  
  if (!data?.data?.length)
    return (
      <div className='min-h-[60vh] flex justify-center items-center'>
        <Empty description='No Products Found' />
      </div>
    )

  return (
    <div className='flex flex-col gap-8'>

      {/* Heading */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>
            Latest Products
          </h1>

          <p className='text-gray-500 mt-1'>
            Explore our newest collection
          </p>
        </div>

        <Tag
          color='green'
          className='!px-4 !py-1 text-sm'
        >
          {data.data.length} Products
        </Tag>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7'>
        {data.data.map(
          (item: any, index: number) => {
            const oldPrice =
              item.price +
              (item.price *
                item.discount) /
                100

            return (
              <Card
                key={index}
                hoverable
                className='overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-2xl transition-all duration-300'
                bodyStyle={{
                  padding: 18,
                }}
                cover={
                  <div className='relative w-full h-[260px] overflow-hidden bg-gray-100'>
                    <Image
                      src={
                        item.image ||
                        '/images/avatar.png'
                      }
                      fill
                      alt={`product-${index}`}
                      className='object-cover hover:scale-105 transition duration-300'
                    />

                    {item.discount > 0 && (
                      <Tag
                        color='red'
                        className='!absolute top-3 right-3 !rounded-full !px-3'
                      >
                        {item.discount}% OFF
                      </Tag>
                    )}
                  </div>
                }
              >
                <div className='flex flex-col gap-4'>

                  {/* title */}
                  <div>
                    <h1 className='text-lg font-semibold text-gray-800 line-clamp-1'>
                      {item.title}
                    </h1>

                    <p className='text-sm text-gray-500 line-clamp-2 mt-1'>
                      {item.description}
                    </p>
                  </div>

                  {/* price */}
                  <div className='flex items-center gap-2'>
                    <h1 className='text-2xl font-bold text-black'>
                      ₹{item.price}
                    </h1>

                    {item.discount > 0 && (
                      <del className='text-gray-400'>
                        ₹
                        {Math.floor(
                          oldPrice
                        )}
                      </del>
                    )}
                  </div>

                  {/* stock */}
                  <div className='flex justify-between items-center'>
                    <Tag color='cyan'>
                      {item.quantity} PCS
                    </Tag>

                    <label className='text-xs text-gray-400'>
                      In Stock
                    </label>
                  </div>

                  {/* buttons */}
                  <div className='grid grid-cols-2 gap-3'>
                    <Button
                      icon={<EyeOutlined />}
                      block
                    >
                      Details
                    </Button>

                    <Button
                      type='primary'
                      icon={
                        <ShoppingCartOutlined />
                      }
                      className='!bg-green-500'
                      block
                    >
                      Cart
                    </Button>
                  </div>
                </div>
              </Card>
            )
          }
        )}
      </div>
    </div>
  )
}

export default Products