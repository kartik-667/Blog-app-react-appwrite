import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../../appwrite/db'
import { useState } from 'react'
import Postform from '../post-form/Postform'
function Editpost() {
    const [post, setpost] = useState(null)
    const navigate=useNavigate()
    const {slug}=useParams() //this fetches dynamic paramters


    useEffect(() => {
      if(slug){
        dbService.getPost(slug).then((post)=>{
            setpost(post)
        })
      }else{
        navigate("/")
      }
    
      
    }, [slug, navigate])
    


  return post ? (
    <div className='py-8'>
      <Postform post={post} />
    </div>
  ) : null;
}

export default Editpost
