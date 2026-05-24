import DataInterface from "@/interface/data.interface"
import { Card, Empty, Tag, Button } from "antd"
import Image from "next/image"
import { FC } from "react"
import { ShoppingCartOutlined } from "@ant-design/icons"
import priceClaculate from "@/lib/priceCalculate"

interface TitleInterface extends DataInterface {
  title: string
}

const Slug: FC<TitleInterface> = ({ data, title }) => {
  if (!data)
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <Empty description="Product Not Found" />
      </div>
    )

 
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10">

      <Card
        className="rounded-3xl shadow-xl border-0 overflow-hidden"
        styles={{
          body: {
            padding: 24
          }
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Image */}
          <div className="relative w-full lg:w-[40%] h-[320px] sm:h-[420px] overflow-hidden rounded-2xl bg-slate-100">

            <Image
              src={data.image}
              alt={data.title}
              fill
              loading="eager"
              sizes="(max-width:768px) 100vw, 40vw"
              className="object-cover hover:scale-105 transition duration-500"
            />

            {data.discount > 0 && (
              <Tag
                color="red"
                className="!absolute top-4 right-4 !px-3 !py-1 !rounded-full"
              >
                {data.discount}% OFF
              </Tag>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center gap-5">

            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-slate-800">
                {data.title}
              </h1>

              <p className="text-slate-500 mt-3 leading-7 text-sm md:text-base">
                {data.description}
              </p>
            </div>

            {/* Price */}
         <div className="flex items-center gap-3 flex-wrap">

  {/* Final discounted price */}
        <h1 className="text-3xl font-bold text-green-500">
    ₹{priceClaculate(
      data.price,
      data.discount
    )}
  </h1>

  {/* Old price */}
  {data.discount > 0 && (
    <del className="text-slate-400 text-lg">
     MRP :- ₹{data.price}
    </del>
  )}

      <Tag color="orange">
          {data.discount}% Discount
      </Tag>

          </div>

            {/* Stock */}
            <div className="flex items-center gap-3 flex-wrap">
              <Tag color="green">
                {data.quantity} PCS Available
              </Tag>

              <span className="text-green-600 font-medium">
                In Stock
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">

              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                className="!bg-green-500 sm:w-[200px]"
              >
                Add To Cart
              </Button>

              <Button
                size="large"
                className="sm:w-[200px]"
              >
                Buy Now
              </Button>

            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Slug