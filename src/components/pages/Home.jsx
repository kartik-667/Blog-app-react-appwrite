import React, { useContext, useEffect, useState } from 'react'
import Postcard from '../Postcard'
import dbService from '../../appwrite/db'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { Mycontext } from '../../../Mycontext'

function Home() {
    <Header/>
    const [posts, setposts] = useState([])
    const {loggedIn, user}=useContext(Mycontext)
    console.log(user);
    
    


    useEffect(()=>{
        dbService.getAllPosts().then((posts)=>{
            setposts(posts.documents)
        })

    },[])

    if(posts.length === 0 && loggedIn===false){
        return (
            <div className='w-full text-center py-8 mt-4'>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <Link to="/login">
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            Login to read posts
                        </h1>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }else if(posts.length==0 && loggedIn===true){
        return (
            <div className='w-full text-center py-8 mt-4'>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <Link to="/login">
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            No posts to show
                        </h1>
                        </Link>
                    </div>
                </div>

            </div>
        )

    }

  return (
    <div className='w-full py-8 p-4'>
        <div className='flex flex-row  flex-wrap'>
            {posts.map((post)=> (
                <div className='p-2 w-1/4'>
                    <Postcard post={post}/>
                </div>
    
            ))} </div>

      
    </div>
  )
}

export default Home
