import React, { useEffect, useState } from 'react'
import dbService from '../../appwrite/db'
import Postcard from '../Postcard'
function Allposts() {
    const [posts, setposts] = useState([])

    const getallposts=async ()=>{
        try {
            const resultpost=await dbService.getAllPosts([])
            if(resultpost) setposts(resultpost.documents)
            
        } catch (error) {
            console.log(error);
            
        }

    }

    useEffect(() => {
      getallposts()
    
      
    }, [])
    
    

  return (
    <div className='w-full py-8'>
    <div className="flex flex-wrap">
        {posts.map((post)=> (
            <div key={post.$id}  className='p-2 w-1/4' >
                <Postcard post={post}></Postcard>
            </div>
        ))}
        
        </div>  
      
    </div>
  )
}

export default Allposts
