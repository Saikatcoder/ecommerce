'use client'
import ClientCatchError from '@/lib/client-catch-error'
import priceClaculate from '@/lib/priceCalculate'
import {
  Button,
  Modal,
  Result,
} from 'antd'
import axios from 'axios'
import { useRazorpay, RazorpayOrderOptions } from 'react-razorpay'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


interface ModifiedRazorpayInterface extends RazorpayOrderOptions {
  notes:any
}

interface PayInterface {
  theme?: 'happy' | 'sad'
   title?:string
    product:any
    onSuccess?: (payload: PaymentSuccessInterface)=>void
    onFailed?: (payload:paymentFailedInterface)=>void
    onClick?:()=>void
}

interface PaymentSuccessInterface{
    razorpay_order_id : string
    razorpay_payment_id :string
    razorpay_signature :string
}

interface paymentFailedInterface{
    reason:string
    order_id:string
    payment_id: string
}

interface ProductInterface{
 _id:string
 title:string
 slug:string
 description:string
 price:number
 discount:number
 quantity:number
 image:string
 createAt:string
 updateAt:string
 __v:number
}


const Paynow:FC<PayInterface>= ({product, onSuccess, onFailed, onClick, title='Pay now',theme='happy'}) => {
  const [open, setOpen] = useState(false)
  const isArray = Array.isArray(product)
  const session = useSession()
  const {Razorpay}= useRazorpay()
  const router = useRouter()

const getTotalAmmount = ()=>{
  let sum = 0
  for(let item of product){
    const amount =
      priceClaculate(
        item.product.prices,
        item.product.discount
      ) * item.qnt

    sum = sum + amount
  }

  return sum
}


const getOrderPayload = ()=>{
  const products = []
  const prices = []
  const discounts = []
  const quantities =[]
  if(!isArray){
    return{
      products:[product._id],
      prices:[product.prices],
      discounts:[product.discount],
      quantities:[1]
    }
  }
  for(let item of product){
    products.push(item.product._id)
    prices.push(item.product.prices)
    discounts.push(item.product.discount)
    quantities.push(item.qnt)
  }

  return{
    products,prices,discounts,quantities
  }
}

const handleSuccess = (payload:any)=>{
  if(onSuccess)
    return onSuccess(payload)

  return null
}

const payNow = async ()=>{
  try{
    if(!session.data)
      throw new Error('session not initalized yet')

    if(!session.data.user.address.pincode){
      sessionStorage.setItem('message',"please update your address first")
      return router.push('/user/settings')
    }
   
    const payload = {
      amount : isArray ? getTotalAmmount() : priceClaculate(product.prices, product.discount)
    }

     const {data} = await axios.post('/api/razorpay/order',payload)
    
     const options:ModifiedRazorpayInterface ={
      name:'ecom Shop',
      description:"bulk product",
      amount:data.amount,
      order_id:data.id,
      key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      currency:'INR',
      prefill:{
        name:session.data?.user.name as string,
        email:session.data.user.email as string
      },
      notes:{
         name:session.data?.user.name as string,
         user:session.data.user.id,
        orders:JSON.stringify(getOrderPayload())
      },
      handler:handleSuccess
     }
     
     const rzp = new Razorpay(options)
     rzp.open()
  
     rzp.on('payment.failed',(err:any)=>{
      setOpen(true)
        if(!onFailed)
            return
        const payload ={
            reason: err.reason,
            order_id:err.metadata.order_id,
            payment_id:err.metadata.payment_id
        }
        onFailed(payload)
     })

  }catch(error){
    return ClientCatchError(error)
  }
}



  return (
    <>
    {
      theme === 'happy' ?
      <Button size='large' 
    type='primary' 
    onClick={payNow} 
    className=' !py-6 font-medium !text-base9 bg-green'>
    {title}
    </Button>
    :
    <Button size='large' 
     danger
    type='primary' 
    onClick={payNow} 
    className=' !py-6 font-medium !text-base9'>
    {title}
    </Button>
    }
     <Modal open={open} footer={null} onCancel={()=>setOpen(false)}>
        <Result
         status='error'
         title='Payment failed'
         subTitle='please check and modify the folling information befor resubmitting'
         extra={[
          // eslint-disable-next-line react/jsx-key
          <Link href='/'>
          <Button type='primary' key='console'>Buy Again</Button>
          </Link>
         ]}
        />
     </Modal>
    </>
   
  )
 
}

export default Paynow