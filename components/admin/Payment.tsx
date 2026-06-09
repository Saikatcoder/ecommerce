'use client'

import fetcher from "@/lib/fetcher"
import { Avatar, Skeleton, Table, Tag } from "antd"
import moment from "moment"
import useSWR from "swr"

const Payment = () => {
  const { data, error, isLoading } = useSWR(
    '/api/payment',
    fetcher
  )

  if (isLoading)
    return <Skeleton active />

  if (error)
    return (
      <h1 className="text-red-500">
        {error.message}
      </h1>
    )

  const columns = [
    {
      title: "Customer",
      key: "customer",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <Avatar src="/images/avatar.png" />

          <div className="flex flex-col">
            <h1 className="font-medium">
              {item.user?.fullname}
            </h1>

            <label className="text-gray-400">
              {item.user?.email}
            </label>
          </div>
        </div>
      )
    },

    {
      title: "Product",
      key: "product",
      render: (item: any) => (
        <label>
          {item.order?.product?.title}
        </label>
      )
    },

    {
      title: "Amount",
      key: "amount",
      render: (item: any) => (
        <label>
          ₹{item.order?.price}
        </label>
      )
    },

    {
      title: "Vendor",
      key: "vendor",
      render: (item: any) => (
        <Tag className="capitalize">
          {item.vendor}
        </Tag>
      )
    },

    {
      title: "Payment ID",
      key: "paymentId",
      render: (item: any) => (
        <Tag color="blue">
          {item.paymentId}
        </Tag>
      )
    },

    {
      title: "Date",
      key: "date",
      render: (item: any) => (
        <label>
          {moment(item.createdAt).format(
            'MMM DD, YYYY hh:mm A'
          )}
        </label>
      )
    }
  ]

  return (
    <div className="space-y-8">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={{
          pageSize: 10
        }}
      />
    </div>
  )
}

export default Payment