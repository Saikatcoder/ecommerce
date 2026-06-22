'use client'

import ClientCatchError from '@/lib/client-catch-error'
import fetcher from '@/lib/fetcher'
import priceClaculate from '@/lib/priceCalculate'
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import {
  Button,
  Card,
  Empty,
  Skeleton
} from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import Paynow from '../shared/pay'
import { useRouter } from 'next/navigation'


const Carts = () => {
  const { data, error, isLoading } = useSWR('/api/cart',fetcher)
  const [loading, setLoading] = useState({state: false,index: -1,buttonIndex: -1})
  const router = useRouter()


  if (isLoading) {
    return <Skeleton active />
  }

  if (error) {
    return (
      <h1 className='text-red-500'>
        {error.message}
      </h1>
    )
  }

  if (!data?.length) {
    return (
      <Empty description='Cart is Empty' />
    )
  }
console.log(data)
  const updateQnt = async (
    num: number,
    id: string,
    index: number,
    buttonIndex: number
  ) => {
    try {
      if (num < 1) return

      setLoading({
        state: true,
        index,
        buttonIndex
      })

      await axios.put(`/api/cart/${id}`, {
        qnt: num
      })

      await mutate('/api/cart')

      setLoading({
        state: false,
        index: -1,
        buttonIndex: -1
      })
    } catch (error) {
      setLoading({
        state: false,
        index: -1,
        buttonIndex: -1
      })

      ClientCatchError(error)
    }
    finally{
      setLoading({state:false, index:0, buttonIndex:0})
    }
  }


const removeCart = async ( id: string,index: number,buttonIndex: number) => {
  try {
    setLoading({
      state: true,
      index,
      buttonIndex
    })

    await axios.delete(`/api/cart/${id}`)

    await mutate('/api/cart')
  } catch (error) {
    ClientCatchError(error)
  } finally {
    setLoading({
      state: false,
      index: -1,
      buttonIndex: -1
    })
  }

}

const getTotalAmmount = ()=>{
  let sum = 0
  // eslint-disable-next-line prefer-const
  for(let item of data){
    const amount =
      priceClaculate(
        item.product.prices,
        item.product.discount
      ) * item.qnt

    sum = sum + amount
  }

  return sum
}


  return (
    <div className='space-y-6 max-h-[80vh] overflow-y-auto pr-2'>
      {data.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any, index: number) => (
          <Card
            key={item._id}
            className='rounded-2xl shadow-sm hover:shadow-lg transition-all'
          >
            <div className='flex flex-col lg:flex-row justify-between gap-6'>

              {/* Product */}
              <div className='flex gap-5'>
                <Image
                  src={
                    item.product?.image ||
                    '/images/avatar.png'
                  }
                  alt={
                    item.product?.title
                  }
                  width={140}
                  height={140}
                  className='rounded-xl object-cover'
                />

                <div className='space-y-2'>
                  <h1 className='text-xl font-semibold capitalize'>
                    {item.product?.title}
                  </h1>

                  <div className='flex items-center gap-3'>
                    <span className='font-bold text-lg text-green-600'>
                      ₹
                      {priceClaculate(
                        item.product?.prices,
                        item.product?.discount
                      )}
                    </span>

                    <del className='text-gray-400'>
                      ₹{item.product?.prices}
                    </del>

                    <span className='text-red-500'>
                      ({item.product?.discount}% OFF)
                    </span>
                  </div>

                  <p className='text-gray-500'>
                    Quantity:
                    <span className='font-semibold ml-2'>
                      {item.qnt || 1}
                    </span>
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className='flex items-center gap-3'>
                <Button
                  loading={
                    loading.state &&
                    loading.index === index &&
                    loading.buttonIndex === 0
                  }
                  disabled={loading.state}
                  icon={<MinusOutlined />}
                  onClick={() =>
                  updateQnt(
                     item.qnt - 1,
                     item._id,
                     index,
                      0
                      )
                      }
                         />

                <div className='w-14 h-10 border rounded-lg flex items-center justify-center font-semibold text-lg'>
                  {item.qnt || 1}
                </div>

                <Button
                  loading={
                    loading.state &&
                    loading.index === index &&
                    loading.buttonIndex === 1
                  }
                  disabled={loading.state}
                  icon={<PlusOutlined />}
                  onClick={() =>
                  updateQnt(
                  item.qnt + 1,
                  item._id,
                  index,
                  1
                )
              }
              />

                <Button
                onClick={() => removeCart(item._id, index, 2)}
                  danger
                  icon={<DeleteOutlined />}
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        )
      )}

      <div className='flex justify-end items-center gap-6'>
        <h1 className='text-xl font-semibold'>Total amount = ₹{getTotalAmmount().toString()}</h1>
       <Paynow product={data} title='Buy now' onSuccess={()=>router.push('/user/orders')}/>
      </div>
    </div>
  )
}

export default Carts