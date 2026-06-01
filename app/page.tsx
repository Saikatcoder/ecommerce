import Products from "@/components/Products"

const HomeRouter = async () => {
  const productResponse = await fetch(`${process.env.SERVER}/api/product`)

  const products = productResponse.ok ? await productResponse.json() : {data :[] , total:0}

  return <Products data={products} />
}

export default HomeRouter