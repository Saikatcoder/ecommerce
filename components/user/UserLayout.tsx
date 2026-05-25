'use client'
import ChildrenInterface from "@/interface/children.interface"
import {
  ReconciliationOutlined,
  SettingOutlined,
  ShoppingOutlined
} from "@ant-design/icons"
import {
  Avatar,
  Breadcrumb,
  Button,
  Layout,
  Menu
} from "antd"
import Sider from "antd/es/layout/Sider"
import Link from "next/link"
import { FC } from "react"
import { getBreadCrumbs } from "../admin/AdminLayout"
import { usePathname } from "next/navigation"

const UserLayout: FC<ChildrenInterface> = ({
  children
}) => {
const pathname = usePathname()
  const menus = [
    {
      icon: <ShoppingOutlined />,
      label: (
        <Link href="/user/carts">
          Carts
        </Link>
      ),
      key: "cart",
    },
    {
      icon: <ReconciliationOutlined />,
      label: (
        <Link href="/user/orders">
          Orders
        </Link>
      ),
      key: "orders",
    },
    {
      icon: <SettingOutlined />,
      label: (
        <Link href="/user/settings">
          Setting
        </Link>
      ),
      key: "setting",
    },
  ]

  return (
    <Layout className="h-screen">
      <Sider
        width={300}
        className="border-r border-slate-100 relative bg-white"
      >

        {/* Menu */}
        <Menu
          theme="light"
          mode="inline"
          items={menus}
          className="h-full"
        />

        {/* Bottom User Area */}
        <div className="bg-zinc-900 p-5 absolute bottom-0 left-0 w-full">

          <div className="flex items-center gap-3">

            <Avatar className="w-16 h-16" />

            <div className="text-white">
              <h1 className="text-lg font-medium">
                Saikat
              </h1>

              <p className="text-sm text-slate-300">
                example@email.com
              </p>
            </div>

          </div>

          <Button
            block
            danger
            className="mt-4"
          >
            Logout
          </Button>

        </div>
      </Sider>
<div className="flex flex-col gap-12  w-full">
    <Breadcrumb className="p-5"  items={getBreadCrumbs(pathname)}/>
      <Layout>
       <Layout.Content>
         <div className="w-10/12 mx-auto">
            {children}
         </div>
       </Layout.Content>
      </Layout>

</div>
      {/* Main Content */}
    
    </Layout>
  )
}

export default UserLayout