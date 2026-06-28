'use client'

import { FC } from 'react';
import {
  CreditCardOutlined,
  LoginOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import ChildrenInterface from '@/interface/children.interface';
import { usePathname } from 'next/navigation';
import Logo from '../shared/logo';
import { signOut, useSession } from 'next-auth/react';

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};



 export const getBreadCrumbs = (pathname: string)=>{
    const arr = pathname.split("/")
    const bread = arr.map((item)=>({
      title: item
    }))
    return bread
  }
 const AdminLayout: FC<ChildrenInterface> = ({children}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const pathname = usePathname()
  const session = useSession()
  console.log(session)
 const logout =async ()=>{
   await signOut()
 }

  const menus = [
    {
      icon: <ShoppingOutlined />,
      label: <Link href="/admin/products">Products</Link>,
      key: '/adimn/products'
    },
    {
      icon: <ReconciliationOutlined />,
      label: <Link href="/admin/orders">Orders</Link>,
      key: '/admin/orders'
    },
    {
      icon: <CreditCardOutlined />,
      label: <Link href="/admin/payments">Payments</Link>,
      key: '/admin/payments'
    },
    {
      icon: <UserOutlined />,
      label: <Link href="/admin/users">Users</Link>,
      key: '/admin/users'
    }
  ]

  const acountMenu = {
    items: [
      {
        label: <p className='text-green-500 capitalize'>{session.data?.user.name}</p>
      },
      {
        icon: <LoginOutlined  className='text-red-500'/>,
        label: <a onClick={logout} className='text-red-500'>Logout</a>,
        key: 'logout'
      },
      {
        icon: <UserAddOutlined/>,
        label: <a href='/admin/users'>{session.data?.user.role}</a>,
        key: 'user'
      }
    ]
  }


  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={250}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={menus} selectedKeys={[pathname]} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className='flex items-center'>
          <div className='px-8 flex justify-between items-center w-full'>
            <Logo />
            <div>
              <Dropdown menu={acountMenu}>
                <Avatar 
                  size="large" 
                  src="/images/avatar.png"  
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }} className='px-8 flex flex-col gap-8'>
          <Breadcrumb
            items={getBreadCrumbs(pathname)}
          />
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout