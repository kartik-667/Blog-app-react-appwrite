import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mycontext } from '../../Mycontext'



function AuthLayout({children, authentication=true}) {
    const navigate=useNavigate()
    const [loader, setloader] = useState(true)
    const {loggedIn}=useContext(Mycontext)

    const authStatus=loggedIn


    //fix this file later
    useEffect(()=>{
      if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setloader(false)

    },[authStatus,navigate,authentication])

    


 return loader ? <h1>Loading...</h1> : <> {children} </>
}

export default AuthLayout
