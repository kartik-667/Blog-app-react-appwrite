import React from 'react'
import { Link } from 'react-router-dom'
import dbService from '../appwrite/db'
function Postcard({$id,featuredImage,title}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-lg'>
            <div className='w-full justify-center '>
                <img className='rounded-xl' src={dbService.getFilePreview(featuredImage)} alt={title} />

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>

        </div>

    </Link>
  )
}

export default Postcard
