import Slug from "@/components/Slug"
import SlugInterface from "@/interface/slug.interface"
import { FC } from "react"

const SlugRouter: FC<SlugInterface> = async ({ params }) => {
  const { slug } = await params
  const slugResponse = await fetch(`${process.env.SERVER}/api/product/${slug}`)

  const data = slugResponse.ok? await slugResponse.json(): null

  return <Slug data={data} title={slug} />
}

export default SlugRouter