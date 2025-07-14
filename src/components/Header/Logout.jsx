import React, { useContext } from 'react'
import authService from '../../appwrite/auth'
import { Mycontext } from '../../../Mycontext'

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
       <button onClick={handlelogout} className='hover:bg-blue-100 transition'>logout here</button>
    </div>
  )
}

export default Logout
