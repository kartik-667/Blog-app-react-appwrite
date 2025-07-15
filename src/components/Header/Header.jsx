import React, { useContext } from 'react'
import authService from '../../appwrite/auth'
import { Mycontext } from '../../../Mycontext'
import { Link, Navigate , useNavigate} from 'react-router-dom'
import Logout from './Logout'
import Select from '../Select'

function Header() {

    const {setuser, setloggedIn, loggedIn}=useContext(Mycontext)

    const navigate=useNavigate()

    const authStatus=loggedIn

    const navItems=[ //contains items that will be shown in navbar
        {
            name:"Home",
            slug:"/home",
            active:true

        },
        {
            name:"Login",
            slug:"/login",
            active:!authStatus

        },
        {
            name:"Signup",
            slug:"/signup",
            active:!authStatus

        },
       
        {
            name:"All posts",
            slug:"/all-posts",
            active:authStatus

        },
        {
            name:"Add posts",
            slug:"/add-posts",
            active:authStatus

        },
    ]





  return (
    <header className='w-full bg-gray-500 p-2 flex  '>
        <div className="left">
            <Link to='/'>
                <button className='hover:bg-blue-100 transition'>logo comes here</button>
            </Link>
        </div>
        
        <Select ></Select>
        <ul className='flex ml-auto '>
            {navItems.map((item)=>
                item.active==true ? (
                    <li key={item.name}>
                        <Link to={item.slug}>
                            <button  className='hover:bg-blue-300 rounded-full transition-all px-6 py-2 duration-200 '>{item.name}</button>

                        </Link>

                        
                    </li>
                ) : null

            )}
            {authStatus && (
                <Logout></Logout>
            )}


        </ul>
        
      
    </header>
  )
}

export default Header
