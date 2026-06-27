'use client'

import fetcher from '@/lib/fetcher'
import {
  Avatar,
  Card,
  Skeleton,
  Statistic,
  Table,
  Tag,
  Row,
  Col
} from 'antd'
import {
  CheckCircleOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import useSWR from 'swr'

const Payment = () => {
  const { data, error, isLoading } = useSWR(
    '/api/payment',
    fetcher
  )

  if (isLoading) return <Skeleton active />

  if (error)
    return (
      <h1 className="text-red-500">
        {error.message}
      </h1>
    )

  // Dashboard stats
  const totalRevenue = data.reduce(
    (sum: number, item: any) => sum + item.amount,
    0
  )

  const totalTax = data.reduce(
    (sum: number, item: any) => sum + (item.tax || 0),
    0
  )

  const columns = [
    {
      title: 'Customer',
      key: 'customer',
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <Avatar
            size="large"
            className="!bg-emerald-500 capitalize"
          >
            {item.user.fullname[0]}
          </Avatar>

          <div>
            <h1 className="font-semibold text-gray-800 capitalize">
              {item.user?.fullname}
            </h1>
            <p className="text-gray-400 text-xs">
              {item.user?.email}
            </p>
          </div>
        </div>
      )
    },

    {
      title: 'Amount',
      key: 'amount',
      render: (item: any) => (
        <span className="font-semibold text-green-600">
          ₹{item.amount}
        </span>
      )
    },

    {
      title: 'Tax',
      key: 'tax',
      render: (item: any) => (
        <span>₹{item.tax || 0}</span>
      )
    },

    {
      title: 'Method',
      key: 'method',
      render: (item: any) => (
        <Tag color="purple" className="capitalize px-3 py-1">
          {item.method}
        </Tag>
      )
    },

    {
      title: 'Status',
      key: 'status',
      render: (item: any) => (
        <Tag
          color={
            item.status === 'captured'
              ? 'green'
              : 'orange'
          }
          className="capitalize px-3 py-1"
        >
          {item.status}
        </Tag>
      )
    },

    {
      title: 'Vendor',
      key: 'vendor',
      render: (item: any) => (
        <Tag color="blue" className="capitalize">
          {item.vendor}
        </Tag>
      )
    },

    {
      title: 'Payment ID',
      key: 'paymentId',
      render: (item: any) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
          {item.paymentId}
        </code>
      )
    },

    {
      title: 'Date',
      key: 'date',
      render: (item: any) => (
        <span className="text-gray-500 text-sm">
          {moment(item.createdAt).format(
            'DD MMM YYYY, hh:mm A'
          )}
        </span>
      )
    }
  ]

  return (
    <div className="space-y-6 p-4">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Dashboard
        </h1>
        <p className="text-gray-500">
          Monitor all customer transactions
        </p>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="rounded-2xl shadow-sm">
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix="₹"
              valueStyle={{ color: '#16a34a' }}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="rounded-2xl shadow-sm">
            <Statistic
              title="Tax Collected"
              value={totalTax}
              prefix="₹"
              valueStyle={{ color: '#2563eb' }}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="rounded-2xl shadow-sm">
            <Statistic
              title="Successful Payments"
              value={data.length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#9333ea' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card className="rounded-2xl shadow-md border-0">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={{
            pageSize: 6
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  )
}

export default Payment