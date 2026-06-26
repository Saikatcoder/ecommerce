'use client'
import ClientCatchError from "@/lib/client-catch-error"
import { Button, Divider, Form, Input, InputNumber, message } from "antd"
import FormItem from "antd/es/form/FormItem"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect } from "react"


const Setting = () => {
  const [userForm ]= Form.useForm()
  const session = useSession()


  useEffect(()=>{
    const sessionmessages = sessionStorage.getItem('message')
    if(sessionmessages)
    {
      message.warning(sessionmessages)
      sessionStorage.removeItem('message')
    }
  },[])

  useEffect(() => {
  if (session.data?.user) {
    const address = session.data.user.address || {}

    userForm.setFieldsValue({
      fullname: session.data.user.name || "",
      street: address.street || "",
      city: address.city || "",
      country: address.country || "",
      pincode: address.pincode || undefined,
    })
  }
}, [session.data, userForm])
  
  const saveChanges = async (values:any)=>{
    try {
      const payload ={
        fullname: values.fullname,
        address: {
          street: values.street,
          city: values.city,
          country: values.country,
          state: values.state,
          pincode: values.pincode,
        }
      }
      await axios.put(`/api/user/profile`, payload)
      session.update()
      window.location.reload()
      message.success('profile info saved')
    } catch (error) {
      ClientCatchError(error)
    }
  }


  return (
    <div>
      <h1 className='text-lg font-medium'>Profile Information</h1>
      <Divider/>
      <Form layout="vertical" form={userForm} onFinish={saveChanges}>
        <div className="grid grid-cols gap-8">
          <Form.Item
          label='Fullname'
          name='fullname'
          rules={[{required:true}]}
          >
            <Input size='large' />
          </Form.Item>

           <Form.Item
          label='Street Address'
          name='street'
          rules={[{required:true}]}
          >
            <Input size='large' />
          </Form.Item>

           <Form.Item
          label='City'
          name='city'
          rules={[{required:true}]}
          >
            <Input size='large' />
          </Form.Item>
        </div>
        <div className="grid grid-cols gap-8">
          <Form.Item
          label='Country'
          name='country'
          rules={[{required:true}]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.Item
          label='Pincode'
          name='pincode'
          rules={[{required:true}]}
          >
            <InputNumber size='large' />
          </Form.Item>
        </div>
        <FormItem>
          <Button htmlType="submit" size="large" type='primary'>Save Now</Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default Setting
