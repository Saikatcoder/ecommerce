'use client'

import ClientCatchError from "@/lib/client-catch-error"
import fetcher from "@/lib/fetcher"
import priceClaculate from "@/lib/priceCalculate"
import {
  Avatar,
  message,
  Select,
  Skeleton,
  Table,
  Tag,
  Card
} from "antd"
import axios from "axios"
import moment from "moment"
import useSWR, { mutate } from "swr"
import Image from "next/image"

const Order = () => {
  const { data, error, isLoading } = useSWR('/api/order', fetcher)

  if (isLoading) return <Skeleton active />

  if (error)
    return (
      <h1 className="text-red-500 font-medium">
        {error.message}
      </h1>
    )

  const changeStatus = async (status: string, id: string) => {
    try {
      await axios.put(`/api/order/${id}`, { status })

      message.success(`Order updated to ${status}`)

      mutate('/api/order')
    } catch (error) {
      ClientCatchError(error)
    }
  }

  const getTotalSales = (item: any) => {
    let sum = 0

    for (let i = 0; i < item.prices.length; i++) {
      const price = item.prices[i]
      const discount = item.discounts[i]
      const qnt = item.quantities[i]

      const total =
        priceClaculate(price, discount) * qnt

      sum += total
    }

    return `₹${sum.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'orange'
      case 'dispatched':
        return 'blue'
      case 'delivered':
        return 'green'
      case 'returned':
        return 'red'
      default:
        return 'green'
    }
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (id: string) => (
        <span className="font-semibold text-slate-700">
          #{id}
        </span>
      )
    },

    {
      title: 'Customer',
      key: 'customer',
      render: (item: any) => (
        <div className="flex items-center gap-3">

          <Avatar className="!bg-green-500">
            {item.user.fullname?.[0]?.toUpperCase()}
          </Avatar>

          <div>
            <h1 className="font-medium capitalize">
              {item.user.fullname}
            </h1>

            <p className="text-gray-500 text-xs">
              {item.user.email}
            </p>
          </div>

        </div>
      )
    },

    {
      title: 'Total Sales',
      key: 'sales',
      render: (item: any) => (
        <span className="font-bold text-green-600">
          {getTotalSales(item)}
        </span>
      )
    },

    {
      title: 'Products',
      key: 'products',
      render: (item: any) => (
        <Tag color="purple">
          {item.products.length} Items
        </Tag>
      )
    },

    {
      title: 'Address',
      key: 'address',
      render: (item: any) => {
        const address = item.user?.address

        if (!address?.pincode)
          return (
            <span className="text-red-500">
              No Address
            </span>
          )

        return (
          <div className="text-sm max-w-[250px]">
            {address.street}, {address.city},
            {address.country} - {address.pincode}
          </div>
        )
      }
    },

    {
      title: 'Status',
      key: 'status',
      render: (item: any) => (
        item.status === 'processing' ?
        <Select
          style={{ width: 150 }}
          defaultValue={item.status}
          onChange={(value) =>
            changeStatus(value, item._id)
          }
        >
          <Select.Option value="processing">
            Processing
          </Select.Option>

          <Select.Option value="dispatched">
            Dispatched
          </Select.Option>

          <Select.Option value="delivered">
           Delivered
          </Select.Option>

          <Select.Option value="returned">
            Returned
          </Select.Option>
        </Select>
        :
        <Tag color={item.status === 'dispatched' ? 'green' : 'magenta'} className="capitalized">{item.status}</Tag>
      )
    },

    {
      title: 'Current Status',
      key: 'currentStatus',
      render: (item: any) => (
        <Tag color={getStatusColor(item.status)}>
          {item.status}
        </Tag>
      )
    },

    {
      title: 'Created',
      key: 'created',
      render: (item: any) =>
        moment(item.createdAt).format(
          'DD MMM YYYY hh:mm A'
        )
    }
  ]

  return (
    <div className="space-y-6 p-4">

      <div>
        <h1 className="text-3xl font-bold">
          Orders Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all customer orders
        </p>
      </div>

      <Card className="rounded-2xl shadow-md">

        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={{ pageSize: 5 }}

          expandable={{
            expandedRowRender: (record: any) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">

                {record.products.map(
                  (product: any, index: number) => (
                    <Card
                      key={index}
                      size="small"
                      className="rounded-xl"
                    >
                      <div className="flex gap-4">

                        <Image
                          src={product.image}
                          alt={product.title}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />

                        <div>

                          <h2 className="font-semibold">
                            {product.title}
                          </h2>

                          <p className="text-sm text-gray-500">
                            Qty: {record.quantities[index]}
                          </p>

                          <p className="text-green-600 font-bold">
                            ₹
                            {priceClaculate(
                              record.prices[index],
                              record.discounts[index]
                            )}
                          </p>

                        </div>
                      </div>
                    </Card>
                  )
                )}

              </div>
            )
          }}
        />

      </Card>
    </div>
  )
}

export default Order