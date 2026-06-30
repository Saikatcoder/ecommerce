import Products from "@/components/Products"


interface DataInterface {
  products :[]
}

export const metadata ={
  title: `Ecart - ${process.env.DOMAIN}`,
  description : 'India`s best and affordable ecommerce website',
  keywords: "ecart, ecart.com , best T-shirt",
  openGraph:{
    title:`Ecart - ${process.env.DOMAIN}`,
    description : 'India`s best and affordable ecommerce website',
    url:process.env.SERVER,
    siteName : 'Ecart',
    images: [
      {
        url :"/images/logo.webp" ,
      },
    ],
    locale: "en_US",
    type: "website"
  }
}


const HomeRouter = async () => {
  const productResponse = await fetch(`${process.env.SERVER}/api/product`)

  const products = productResponse.ok ? await productResponse.json() : {data :[] , total:0}

  return <Products data={products} />
}

export default HomeRouter