import React, { useEffect, useState } from 'react'
import Postcard from '../Postcard'
import dbService from '../../appwrite/db'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setposts] = useState([])
    


    useEffect(()=>{
        dbService.getAllPosts().then((posts)=>{
            setposts(posts.documents)
        })

    },[])

    if(posts.length === 0){
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
    }

  return (
    <div className='w-full py-8'>
        <div className='flex flex-wrap'>
            {posts.map((post)=> (
                <div className='p-2 w-1/4'>
                    <Postcard post={post}/>
                </div>

            ))} </div>

      
    </div>
  )
}

export default Home
