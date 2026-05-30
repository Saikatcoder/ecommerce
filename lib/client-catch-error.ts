import { message } from "antd"
import { isAxiosError } from "axios"

const ClientCatchError = (err:unknown)=>{
  if( isAxiosError(err))
   return message.error(err.response?.data.message || err.message)
  
    if(err instanceof Error)
       return message.error(err.message)

    message.error('An unknown error occured')
    
}

export default ClientCatchError