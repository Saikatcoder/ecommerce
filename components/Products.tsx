'use client'
import DataInterface from '@/interface/data.interface'
import {
  Button,
  Card,
  Empty,
  message,
  Tag,
} from 'antd'
import {
  EyeFilled,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import priceClaculate from '@/lib/priceCalculate'
import axios from 'axios'
import ClientCatchError from '@/lib/client-catch-error'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'


const Products: FC<DataInterface> = ({ data }) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const router = useRouter()
  const addToCart = async (id :string)=>{
    try {
      const session = await getSession()
      if(!session)
        return router.push('/login')

     await axios.post('/api/cart',{product:id})
     message.success('product addto cart')
      mutate('/api/cart?count=true')
    } catch (error) {
      return ClientCatchError(error)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsBrowser(true)
  }, [])

  if (!isBrowser) return null

  if (!data?.data?.length)
    return (
      <div className='min-h-[60vh] flex justify-center items-center px-4'>
        <Empty description='No Products Found' />
      </div>
    )

  return (
    <div className='flex flex-col gap-6 md:gap-8 px-3 sm:px-5 lg:px-8'>

      {/* Heading */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800'>
            Latest Products
          </h1>

          <p className='text-sm sm:text-base text-gray-500 mt-1'>
            Explore our newest collection
          </p>
        </div>

        <Tag
          color='green'
          className='!px-4 !py-1 text-sm w-fit'
        >
          {data.data.length} Products
        </Tag>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7'>
        {data.data.map((item: any, index: number) => {
          const slug = item.title
            ?.toLowerCase()
            .split(' ')
            .join('-')

          return (
            <Card
              key={index}
              hoverable
              className='overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col'
              styles={{
                body: {
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                },
              }}
              cover={
                <div className='relative w-full h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden bg-gray-100'>
                  <Image
                    src={
                      item.image ||
                      '/images/avatar.png'
                    }
                    fill
                    loading='eager'
                    sizes='(max-width:768px) 100vw,
                           (max-width:1200px) 50vw,
                           33vw'
                    alt={item.title}
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
              <div className='flex flex-col gap-4 h-full'>

                {/* Title + Description */}
                <Card.Meta
                  title={
                    <Link
                      href={`/products/${slug}`}
                      className='text-base sm:text-lg font-semibold text-gray-800 line-clamp-1 block hover:text-green-600 transition'
                    >
                      {item.title}
                    </Link>
                  }
                  description={
                    <p className='text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1'>
                      {item.description}
                    </p>
                  }
                />

                {/* Price */}
                <div className='flex flex-wrap items-center gap-2'>
                  <h2 className='text-xl sm:text-2xl font-bold text-black'>
                    ₹{priceClaculate(
                      item.price,
                      item.discount
                    )}
                  </h2>

                  {item.discount > 0 && (
                    <del className='text-gray-400 text-sm'>
                      ₹{item.price}
                    </del>
                  )}
                </div>

                {/* Stock */}
                <div className='flex justify-between items-center'>
                  <Tag color='cyan'>
                    {item.quantity} PCS
                  </Tag>

                  <label className='text-xs text-gray-400'>
                    In Stock
                  </label>
                </div>

                {/* Buttons */}
                <div className='grid grid-cols-2 gap-2 sm:gap-3 mt-auto'>
                  <Link href={`/products/${slug}`}>
                    <Button
                      icon={<EyeFilled />}
                      block
                      className='text-xs sm:text-sm'
                    >
                      Details
                    </Button>
                  </Link>

                  <Button
                    type='primary'
                    icon={<ShoppingCartOutlined />}
                    className='bg-green-500! text-xs sm:text-sm'
                    block
                    onClick={()=>addToCart(item._id)}
                  >
                    Cart
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Products