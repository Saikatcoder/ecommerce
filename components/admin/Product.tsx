'use client'

import {
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons'

import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Tag,
  Upload,
} from 'antd'

import React, { useState } from 'react'
import Image from 'next/image'

const Products = () => {
  const [open, setOpen] = useState(false)

  const onSearch = (values: any) => {
    console.log(values)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const createProduct = (values: any) => {
    console.log(values)
  }

  return (
    <div className='flex flex-col gap-8'>
      {/* Top Header */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>
            Products
          </h1>

          <p className='text-gray-500 mt-1'>
            Manage your ecommerce products professionally
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <Form onFinish={onSearch}>
            <Form.Item
              name='search'
              className='!mb-0'
            >
              <Input
                size='large'
                placeholder='Search products...'
                prefix={<SearchOutlined />}
                className='!w-[320px] !rounded-xl'
              />
            </Form.Item>
          </Form>

          <Button
            onClick={() => setOpen(true)}
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            className='!bg-indigo-500 !rounded-xl !px-6'
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7'>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Card
              key={index}
              hoverable
              className='rounded-2xl overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-300'
              bodyStyle={{
                padding: '18px',
              }}
              cover={
                <div className='relative w-full h-[230px] overflow-hidden bg-gray-100'>
                  <Image
                    src='/images/product.jpg'
                    fill
                    alt={`product-${index}`}
                    className='object-cover hover:scale-105 transition-transform duration-300'
                  />
                </div>
              }
              actions={[
                <EditOutlined
                  key='edit'
                  className='!text-emerald-500 text-lg'
                />,
                <DeleteOutlined
                  key='delete'
                  className='!text-rose-500 text-lg'
                />,
              ]}
            >
              <div className='flex flex-col gap-4'>
                {/* Category + Stock */}
                <div className='flex items-center justify-between'>
                  <Tag
                    color='blue'
                    className='!rounded-full !px-3'
                  >
                    Fashion
                  </Tag>

                  <h1 className='text-xs text-gray-400'>
                    ID #{1001 + index}
                  </h1>
                </div>

                {/* Product Title */}
                <div>
                  <h1 className='text-lg font-semibold text-gray-800 line-clamp-1'>
                    Men’s Premium Blue Jeans
                  </h1>

                  <p className='text-sm text-gray-500 mt-1 line-clamp-2'>
                    High quality stylish jeans with
                    premium fabric and modern fit.
                  </p>
                </div>

                {/* Price */}
                <div className='flex items-end gap-2'>
                  <h1 className='text-2xl font-bold text-black'>
                    ₹2000
                  </h1>

                  <del className='text-gray-400'>
                    ₹4000
                  </del>

                  <label className='text-green-600 text-sm font-medium'>
                    50% OFF
                  </label>
                </div>

                {/* Stock */}
                <div className='flex justify-between items-center'>
                  <Tag
                    color='green'
                    className='!rounded-full !px-3 !py-[2px]'
                  >
                    20 PCS Left
                  </Tag>

                  <label className='text-xs text-gray-400'>
                    Updated 2h ago
                  </label>
                </div>
              </div>
            </Card>
          ))}
      </div>

      {/* Modal */}
      <Modal
        open={open}
        width={750}
        centered
        footer={null}
        onCancel={handleClose}
        maskClosable={false}
      >
        <div className='mb-5'>
          <h1 className='text-2xl font-bold text-gray-800'>
            Add New Product
          </h1>

          <p className='text-gray-500 mt-1'>
            Fill product details carefully
          </p>
        </div>

        <Divider />

        <Form
          layout='vertical'
          onFinish={createProduct}
        >
          <Form.Item
            label='Product Name'
            name='title'
            rules={[{ required: true }]}
          >
            <Input
              size='large'
              placeholder='Enter product name'
              className='!rounded-xl'
            />
          </Form.Item>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <Form.Item
              label='Price'
              name='price'
              rules={[
                {
                  required: true,
                  type: 'number',
                },
              ]}
            >
              <InputNumber
                size='large'
                placeholder='00.00'
                className='!w-full !rounded-xl'
              />
            </Form.Item>

            <Form.Item
              label='Discount'
              name='discount'
              rules={[
                {
                  required: true,
                  type: 'number',
                },
              ]}
            >
              <InputNumber
                size='large'
                placeholder='20'
                className='!w-full !rounded-xl'
              />
            </Form.Item>

            <Form.Item
              label='Quantity'
              name='quantity'
              rules={[
                {
                  required: true,
                  type: 'number',
                },
              ]}
            >
              <InputNumber
                size='large'
                placeholder='20'
                className='!w-full !rounded-xl'
              />
            </Form.Item>
          </div>

          <Form.Item
            label='Description'
            rules={[{ required: true }]}
            name='description'
          >
            <Input.TextArea
              rows={5}
              placeholder='Write product description'
              className='!rounded-xl'
            />
          </Form.Item>

          <Form.Item
            label='Upload Image'
            name='image'
            rules={[{ required: true }]}
          >
            <Upload>
              <Button
                size='large'
                icon={<UploadOutlined />}
                className='!rounded-xl'
              >
                Upload Product Image
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item className='!mb-0'>
            <Button
              htmlType='submit'
              size='large'
              type='primary'
              icon={<ArrowRightOutlined />}
              className='!bg-indigo-500 !rounded-xl !px-8'
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Products