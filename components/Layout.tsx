'use client'

import ChildrenInterface from '@/interface/children.interface'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { FC } from 'react'
import Logo from './shared/logo'
import Link from 'next/link'
import { UserAddOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { usePathname } from 'next/navigation'

const menus = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    href: '/products',
  },
  {
    label: 'Carts',
    href: '/carts',
  },
  {
    label: 'Sign in',
    href: '/login',
  },
]

const Layout: FC<ChildrenInterface> = ({children}) => {
  const pathName = usePathname()

  const blackList = [
    '/admin',
    '/login',
    '/signup'
  ]

  const isBalckList = blackList.some((path)=>pathName.startsWith(path))
 
  if(isBalckList)
    return(
   <AntdRegistry>
     <div>{children}</div>
   </AntdRegistry>
  )

  return (
    <AntdRegistry>
      <nav className='sticky top-0 left-0 z-50 bg-white shadow-md px-10 lg:px-14 h-[72px] flex justify-between items-center'>
        
        {/* Logo */}
        <Logo />

        {/* Menu */}
        <div className='flex items-center gap-2 text-sm font-medium'>
          {menus.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className='px-5 py-2 rounded-lg text-gray-700 hover:text-green-500 hover:bg-green-50 transition-all duration-300'
            >
              {item.label}
            </Link>
          ))}

          {/* Signup Button */}
          <Link
            href='/signup'
            className='!bg-green-500 hover:!bg-green-600 !border-none !rounded-lg !ml-3'
          >
            <UserAddOutlined />
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className='w-8/12 mx-auto py-24'>
        {children}
      </div>
     <footer className='bg-zinc-900 h-[450px] flex items-center justify-center'></footer>
    </AntdRegistry>
  )
}

export default Layout