import Products from "@/components/Products"

const HomeRouter = async () => {
  const productResponse = await fetch(`${process.env.SERVER}/api/product`)

  const products = await productResponse.json()

  return (
    <Products data={products} />
  )
}

export default HomeRouter