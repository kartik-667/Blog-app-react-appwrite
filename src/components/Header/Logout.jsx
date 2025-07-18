import React, { useContext } from 'react'
import authService from '../../appwrite/auth'
import { Mycontext } from '../../../Mycontext'
import Button from '../Button'
function Logout() {
    const {setuser, setloggedIn}=useContext(Mycontext)

    async function handlelogout(){
    const res=await authService.logout()
    if(res){
      setuser("")
      setloggedIn(false)
      console.log("logged out successfully");
      
    }
  }

  return (
    <div>
       <Button onClick={handlelogout} data="Logout" className='hover:bg-blue-100 transition'>Logout</Button>
    </div>
  )
}

export default Logout
