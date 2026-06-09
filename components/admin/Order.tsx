'use client'

import ClientCatchError from "@/lib/client-catch-error"
import fetcher from "@/lib/fetcher"
import { Avatar, message, Select, Skeleton, Table } from "antd"
import axios from "axios"
import moment from "moment"
import useSWR, { mutate } from "swr"



const Order = () => {
 const {data, error, isLoading} = useSWR('/api/order', fetcher)

 if(isLoading)
  return <Skeleton active/>

 if(error)
 return <h1 className="text-red-500 font-medium">{error.message}</h1>


const changeStatus = async(status:string, id:any)=>{
  try {
    await axios.put(`api/order/${id}`,{status})
    message.success(`product status updated to${status}`)
    mutate('/api/order')
  } catch (error) {
    ClientCatchError(error)
  }
}


  const columns = [
   {
      title: "Customer",
      key:"customer",
      render :(item:any)=>(
         <div className="flex lg:gap-3">
          <Avatar src='/images/avatar.png' className="!bg-orange-500 !capitalize">
          {
              item.user.fullname[0]
          }
          </Avatar>
         <div className="flex flex-col">
           <h1 className="font-medium">{item.user.fullname}</h1>
           <label className="text-gray-400">{item.user.email}</label>
         </div>
         </div>
      )
    },
    {
      title:"product",
      key:'product',
      render:(item: any)=>(
        <label>{item.product.productName}</label>
      )
    },
    {
      title:"price",
      key:'price',
      render:(item: any)=>(
        <label>{item.product.price}</label>
      )
    },
     {
      title:"Discount",
      key:'discount',
      render:(item: any)=>(
        <label>{item.product.discount}%</label>
      )
    },
    {
      title: 'Address',
      key:'address',
      render:(item:any)=>(
        <label className="text-gray-400">{
          item.user.address || "address not found"
        }</label>
      )
    },
    {
      title:'Status',
      key:'status',
      render:(item:any)=>(
        <Select style={{width:120}} defaultValue={item.status} onChange={(value)=>changeStatus(value, item._id)}>
          <Select.Option value='processing'>Processing</Select.Option>
          <Select.Option value='dispatched'>Dispatched</Select.Option>
          <Select.Option value='returend'>Returend</Select.Option>
        </Select>
      )
    },
    {
      title:'Data',
      key:'data',
      render:(item:any)=>(
        <label>{moment(item.createdAt).format('MM DD, YYY hh:mm A')}</label>
      )
    }
  ]
  return (
    <div className=" space-y-8">
     <Table
       columns ={columns}
       dataSource={data}
       rowKey='_id'
     />
    </div>
  )
}

export default Order
