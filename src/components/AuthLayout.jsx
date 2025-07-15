import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mycontext } from '../../Mycontext'



function AuthLayout({children, authentication=true}) {
    const navigate=useNavigate()
    const [loader, setloader] = useState(false)
    const {loggedIn}=useContext(Mycontext)

    const authStatus=loggedIn


    //fix this file later
    useEffect(()=>{

    },[authStatus,navigate,authentication])

    


  return (
    <div>
      <h1>Auth layout</h1>
    </div>
  )
}

export default AuthLayout
