import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../../appwrite/db'
import { useState } from 'react'
import Postform from '../post-form/Postform'
import { Mycontext } from '../../../Mycontext'

import parse from 'html-react-parser'

function Post() {
     const [post, setpost] = useState(null)
    const navigate=useNavigate()
    const {slug}=useParams() //this fetches dynamic paramters
    const {user}=useContext(Mycontext)

    const isAuthor= post && user ? post.userId ===user.$id : false

    const deletePost = () => {
        dbService.deletePost(post.$id).then((status) => {
            if (status) {
                dbService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };




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
        <div className="py-8">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
        </div>
    ) : null;
}

export default Post
