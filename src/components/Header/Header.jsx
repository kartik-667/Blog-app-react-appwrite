import React, { useContext, useEffect } from 'react'
import authService from '../../appwrite/auth'
import { Mycontext } from '../../../Mycontext'
import { Link, Navigate , useNavigate} from 'react-router-dom'
import Logout from './Logout'
import Select from '../Select'
import bloghub from '../../../public/bloghub.png'

function Header() {

    const {setuser, setloggedIn, loggedIn,user}=useContext(Mycontext)

    const navigate=useNavigate()

    const authStatus=loggedIn

    const navItems=[ //contains items that will be shown in navbar
        {
            name:"Home",
            slug:"/",
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
            name:"Add post",
            slug:"/add-post",
            active:authStatus

        },
    ]

    useEffect(() => {
      const fetchuser=async ()=>{
        try {
            const res=await authService.getCurrentUser()
            if(res){
                setloggedIn(true)
                setuser(res)
            }
            
        } catch (error) {
            console.log('user not loggedin');
            
            
        }
      }
      fetchuser()
    
      
    }, [])
    





  return (
    <header className='w-full bg-gray-500 p-2 flex justify-around  '>
        <div className="left">
            <Link to='/'>
                <button className=' transition'>
                    <img src="/bloghub.png" alt="" className='h-20  ml-6 w-20 rounded-md hover:rounded-md' />
                </button>
            </Link>
        </div>
        
        {/* <Select ></Select> */}
        <ul className='flex ml-auto justify-center items-center '>
            {navItems.map((item)=>
                item.active==true ? (
                    <li key={item.name}>
                        <Link to={item.slug}>
                            <button  className='hover:bg-blue-300 rounded-full transition-all px-6 py-2 duration-200 text-lg '>{item.name}</button>

                        </Link>

                        
                    </li>
                ) : null

            )}
            {authStatus && user  && (
                <Logout></Logout>
            )}


        </ul>
        
      
    </header>
  )
}

export default Header
