import Image from "next/image"


const Logo = () => {
  return (
 <Image
  src="/images/logo.webp"
  alt="logo"
  width={40}
  height={40}
  priority
  style={{width:'auto' ,height:'auto'}}
/>
  )
}

export default Logo
