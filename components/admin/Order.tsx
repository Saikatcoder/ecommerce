'use client'

import { Avatar, Select, Skeleton, Table } from "antd"
import moment from "moment"

const data = [
  {
    "orderId": "ORD1001",
    "userId": "USR001",
    "product": {
      "productId": "P001",
      "productName": "Wireless Mouse",
      "quantity": 2,
      "price": 29.99
    },
    "totalAmount": 59.98,
    "status": "pending",
    "createdAt": "2025-06-05T10:00:00Z"
  },
  {
    "orderId": "ORD1002",
    "userId": "USR002",
    "product": {
      "productId": "P003",
      "productName": "Bluetooth Headphones",
      "quantity": 1,
      "price": 59.99
    },
    "totalAmount": 59.99,
    "status": "success",
    "createdAt": "2025-06-04T12:45:00Z"
  },
  {
    "orderId": "ORD1003",
    "userId": "USR003",
    "product": {
      "productId": "P002",
      "productName": "USB-C Charger",
      "quantity": 3,
      "price": 29.99
    },
    "totalAmount": 89.97,
    "status": "error",
    "createdAt": "2025-06-03T14:30:00Z"
  },
  {
    "orderId": "ORD1004",
    "userId": "USR004",
    "product": {
      "productId": "P004",
      "productName": "Laptop Stand",
      "quantity": 1,
      "price": 49.99
    },
    "totalAmount": 49.99,
    "status": "warning",
    "createdAt": "2025-06-02T16:00:00Z"
  }
]


const Order = () => {
  const columns = [
   {
      title: "Customer",
      key:"customer",
      render :()=>(
         <div className="flex lg:gap-3">
          <Avatar src='/images/avatar.png'></Avatar>
         <div className="flex flex-col">
           <h1 className="font-medium">Saikat</h1>
           <label className="text-gray-400">saikat@saikat.com</label>
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
      key:'pricet',
      render:(item: any)=>(
        <label>{item.product.price}</label>
      )
    },
    {
      title: 'Address',
      key:'address',
      render:()=>(
        <label className="text-gray-400">Bishnupur, krishnaganj , kailashatala</label>
      )
    },
    {
      title:'Status',
      key:'status',
      render:()=>(
        <Select style={{width:120}}>
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
     <Skeleton active/>
     <Table
       columns ={columns}
       dataSource={data}
       rowKey='orderId'
     />
    </div>
  )
}

export default Order
