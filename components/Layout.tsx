'use client'
import ChildrenInterface from '@/interface/children.interface'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { FC } from 'react'
import Logo from './shared/logo'
import Link from 'next/link'
import {
  LoginOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import {
  Avatar,
  Badge,
  Dropdown,
  Tooltip,
} from 'antd'
import {
  signOut,
  useSession,
} from 'next-auth/react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const menus = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    href: '/user/products',
  },
  {
    label: 'Carts',
    href: '/user/carts',
  },
]

const Layout: FC<ChildrenInterface> = ({children}) => {
  const pathname = usePathname()
  const session = useSession()
  
  const {data} = useSWR(session?.data?.user.role === 'user' ? '/api/cart?count=true' : null ,
  session?.data?.user.role === 'user' ?  fetcher: null)
  
  const blackList = [
    '/admin',
    '/login',
    '/signup',
    '/user',
  ]

  const isBlackList = blackList.some(
    (path) => pathname.startsWith(path)
  )

  if (isBlackList) {
    return (
      <AntdRegistry>
        {children}
      </AntdRegistry>
    )
  }

  const userMenu = {
    items: [
      {
        key: 'profile',
        icon: <ProfileOutlined />,
        label: (
          <Link href='/user/orders'>
            {session.data?.user?.name}
          </Link>
        ),
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: (
          <Link href='/user/settings'>
            Settings
          </Link>
        ),
      },
      {
        key: 'logout',
        icon: <LoginOutlined />,
        label: (
          <span
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          >
            Logout
          </span>
        ),
      },
    ],
  }

  const adminMenu = {
    items: [
      {
        key: 'admin',
        icon: <ProfileOutlined />,
        label: (
          <Link href='/admin'>
            Admin Panel
          </Link>
        ),
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: (
          <Link href='/admin/settings'>
            Settings
          </Link>
        ),
      },
      {
        key: 'logout',
        icon: <LoginOutlined />,
        label: (
          <span
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          >
            Logout
          </span>
        ),
      },
    ],
  }

  const dropdownMenu = session.data?.user?.role === 'admin' ? adminMenu : userMenu

  return (
    <AntdRegistry>
      {/* Navbar */}
      <nav className='sticky top-0 left-0 z-50 bg-white shadow-sm border-b border-gray-100'>
        <div className='max-w-7xl mx-auto h-[72px] px-4 lg:px-8 flex items-center justify-between'>
          
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center'
          >
            <Logo />
          </Link>

          {/* Menu */}
          <div className='hidden md:flex items-center gap-2'>
            {menus.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition'
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          {!session.data ? (
            <div className='flex items-center gap-3'>
              <Link
                href='/login'
                className='px-4 py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition'
              >
                Login
              </Link>

              <Link
                href='/signup'
                className='px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition flex items-center gap-2'
              >
                <UserAddOutlined />
                Sign Up
              </Link>
            </div>
          ) : (
            <div className='flex items-center gap-5'>
              
              {
                session.data.user.role === 'user' && 
                <Tooltip title='cart' >
                   <Link href='/user/carts'>
                <Badge count={data && data.count}>
                  <ShoppingCartOutlined className='text-2xl cursor-pointer hover:text-green-500 transition' />
                </Badge>
              </Link>
                </Tooltip>
              }


              {/* User */}
              <div className='flex items-center gap-3'>
                <div className='hidden lg:flex flex-col text-right'>
                  <span className='font-medium text-gray-800'>
                    {session.data.user.name}
                  </span>

                  <span className='text-xs text-gray-500 capitalize'>
                    {session.data.user.role}
                  </span>
                </div>

                <Dropdown
                  menu={dropdownMenu}
                  trigger={['click']}
                >
                  <Avatar
                    size='large'
                    src='/images/avatar.png'
                    className='cursor-pointer'
                  />
                </Dropdown>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className='max-w-7xl mx-auto px-4 lg:px-8 py-10'>
        {children}
      </main>

      {/* Footer */}
      <footer className='bg-zinc-900 text-white py-16 mt-20'>
        <div className='max-w-7xl mx-auto text-center'>
          <Logo />
          <p className='mt-4 text-gray-400'>
            © 2026 Ecom. All Rights Reserved.
          </p>
        </div>
      </footer>
    </AntdRegistry>
  )
}

export default Layout