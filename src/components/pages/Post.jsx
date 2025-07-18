// // // import React, { useContext, useEffect } from 'react'
// // // import { Link, useNavigate, useParams } from 'react-router-dom'
// // // import dbService from '../../appwrite/db'
// // // import { useState } from 'react'
// // // import Postform from '../post-form/Postform'
// // // import { Mycontext } from '../../../Mycontext'
// // // import parse from 'html-react-parser'
// // // import Button from '../Button'
// // // function Post() {
// // //      const [post, setpost] = useState(null)
// // //     const navigate=useNavigate()
// // //     const {slug}=useParams() //this fetches dynamic paramters
// // //     const {user}=useContext(Mycontext)

// // //     const isAuthor= post && user ? post.userId ===user.$id : false

// // //     const deletePost = () => {
// // //         dbService.deletePost(post.$id).then((status) => {
// // //             if (status) {
// // //                 dbService.deleteFile(post.featuredImage);
// // //                 navigate("/");
// // //             }else{
// // //                 navigate("/")
// // //             }
// // //         });
// // //     };




// // //     useEffect(() => {
// // //       if(slug){
// // //         dbService.getPost(slug).then((post)=>{
// // //             if(post){
// // //                 setpost(post)
// // //                 console.log("the post is",post);

// // //             }
            
// // //         }).catch((err)=>{
// // //             console.log(err);

// // //         })
// // //       }else{
// // //         navigate("/")
// // //       }
    
      
// // //     }, [slug, navigate])

// // //     if(!post){
// // //         return (
// // //             <h1>Loading post...</h1>
// // //         )
// // //     }
    
// // //    return post ? (
// // //         <div className="py-8">
// // //                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
// // //                     <img
// // //                         src={dbService.getFilePreview(post.featuredImage)}
// // //                         alt={post.title}
// // //                         className="rounded-xl"
// // //                     />

// // //                     {isAuthor && (
// // //                         <div className="absolute right-6 top-6">
// // //                             <Link to={`/edit-post/${post.$id}`}>
// // //                                 <Button bgColor="bg-green-500" className="mr-3">
// // //                                     Edit
// // //                                 </Button>
// // //                             </Link>
// // //                             <Button bgColor="bg-red-500" onClick={deletePost}>
// // //                                 Delete
// // //                             </Button>
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //                 <div className="w-full mb-6">
// // //                     <h1 className="text-2xl font-bold">{post.title}</h1>
// // //                 </div>
// // //                 <div className="browser-css">
// // //                     {parse(post.content)}
// // //                     </div>
// // //         </div>
// // //     ) : null;
// // // }

// // // export default Post
// // import React, { useContext, useEffect, useState } from 'react';
// // import { Link, useNavigate, useParams } from 'react-router-dom';
// // import dbService from '../../appwrite/db';
// // import Postform from '../post-form/Postform';
// // import { Mycontext } from '../../../Mycontext';
// // import parse from 'html-react-parser';
// // import Button from '../Button';

// // function Post() {
// //     const [post, setPost] = useState(null);
// //     const [previewUrl, setPreviewUrl] = useState(null);
// //     const navigate = useNavigate();
// //     const { slug } = useParams();
// //     const { user } = useContext(Mycontext);

// //     const isAuthor = post && user ? post.userId === user.$id : false;

// //     const deletePost = () => {
// //         dbService.deletePost(post.$id).then((status) => {
// //             if (status) {
// //                 dbService.deleteFile(post.featuredImage);
// //             }
// //             navigate("/");
// //         });
// //     };

// //     useEffect(() => {
// //         if (slug && slug!==null) {
// //             console.log('the slug is ',slug);
            
// //             dbService.getPost(slug).then((fetchedPost) => {
// //                 if (fetchedPost) {
// //                     setPost(fetchedPost);
// //                     console.log("Fetched post:", fetchedPost);

// //                     dbService.getFilePreview(fetchedPost.featuredImage).then((url) => {
// //                         setPreviewUrl(url);
// //                     });
// //                 } else {
// //                     console.log("Post not found, redirecting...");
// //                     navigate("/");
// //                 }
// //             }).catch((err) => {
// //                 console.error(err);
// //                 navigate("/");
// //             });
// //         } else {
// //             navigate("/");
// //         }
// //     }, [slug, navigate]);

// //     if (!post) return <div className="text-center py-8 text-gray-500">Loading post...</div>;

// //     return (
// //         <div className="py-8 max-w-4xl mx-auto px-4">
// //             <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white shadow">
// //                 {previewUrl && (
// //                     <img
// //                         src={previewUrl}
// //                         alt={post.title}
// //                         className="rounded-xl max-h-[500px] object-contain"
// //                     />
// //                 )}

// //                 {isAuthor && (
// //                     <div className="absolute right-6 top-6 flex gap-2">
// //                         <Link to={`/edit-post/${post.$id}`}>
// //                             <Button bgColor="bg-green-500" className="mr-3">
// //                                 Edit
// //                             </Button>
// //                         </Link>
// //                         <Button bgColor="bg-red-500" onClick={deletePost}>
// //                             Delete
// //                         </Button>
// //                     </div>
// //                 )}
// //             </div>
// //             <div className="w-full mb-6">
// //                 <h1 className="text-2xl font-bold">{post.title}</h1>
// //             </div>
// //             <div className="prose max-w-none">
// //                 {parse(post.content)}
// //             </div>
// //         </div>
// //     );
// // }

// // export default Post;

// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import dbService from '../../appwrite/db';
// import { Mycontext } from '../../../Mycontext';
// import parse from 'html-react-parser';
// import Button from '../Button';

// function Post() {
//     const [post, setPost] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const navigate = useNavigate();
//     const { slug } = useParams();
//     const { user } = useContext(Mycontext);

//     const isAuthor = post && user ? post.userId === user.$id : false;

//     const deletePost = () => {
//         dbService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 dbService.deleteFile(post.featuredImage);
//             }
//             navigate("/");
//         });
//     };

//     useEffect(() => {
//         if (slug) {
//             console.log("Requested slug:", slug);
//             dbService.getPost(slug)
//                 .then((fetchedPost) => {
//                     if (fetchedPost) {
//                         console.log("Fetched post:", fetchedPost);
//                         setPost(fetchedPost);

//                         dbService.getFileView(fetchedPost.featuredImage)
//                             .then((url) => {
//                                 console.log("Preview URL:", url);
//                                 setPreviewUrl(url);
//                             })
//                             .catch((err) => {
//                                 console.error("Error fetching preview URL:", err);
//                                 setPreviewUrl(null);
//                             });
//                     } else {
//                         console.log("Post not found, redirecting...");
//                         navigate("/");
//                     }
//                 })
//                 .catch((err) => {
//                     console.error("Error fetching post:", err);
//                     navigate("/");
//                 });
//         } else {
//             console.log("No slug found, redirecting...");
//             navigate("/");
//         }
//     }, [slug, navigate]);

//     if (!post) {
//         return (
//             <div className="text-center py-12 text-gray-500 text-lg animate-pulse">
//                 Loading post...
//             </div>
//         );
//     }

//     return (
//         <div className="py-8 max-w-4xl mx-auto px-4">
//             <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white shadow">
//                 {previewUrl ? (
//                     <img
//                         src={previewUrl}
//                         alt={post.title}
//                         className="rounded-xl max-h-[500px] object-contain"
//                     />
//                 ) : (
//                     <div className="text-gray-400 italic">No preview available</div>
//                 )}

                
//             </div>
            
//             <div className="w-full mb-6 flex ">
//                 <h1 className="text-2xl font-bold">{post.title} </h1>
//                 <div>
//                     {isAuthor && (
//                     <div className="absolute right-6 top-6 flex gap-2">
//                         <Link to={`/edit-post/${post.$id}`}>
//                             <Button bgColor="bg-green-500" className="mr-3">
//                                 Edit
//                             </Button>
//                         </Link>
//                         <Button bgColor="bg-red-500" onClick={deletePost}>
//                             Delete
//                         </Button>
//                     </div>
//                 )}
//                 </div>
                
//             </div>
//             <div className="prose max-w-none">
//                 {post.content ? parse(post.content) : <p className="text-gray-500">No content available.</p>}
//             </div>
//         </div>
//     );
// }

// export default Post;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dbService from '../../appwrite/db';
import { Mycontext } from '../../../Mycontext';
import parse from 'html-react-parser';
import Button from '../Button';

function Post() {
    const [post, setPost] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();
    const { user } = useContext(Mycontext);

    const isAuthor = post && user ? post.userId === user.$id : false;

    const deletePost = () => {
        dbService.deletePost(post.$id).then((status) => {
            if (status) {
                dbService.deleteFile(post.featuredImage);
            }
            navigate("/");
        });
    };

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug)
                .then((fetchedPost) => {
                    if (fetchedPost) {
                        
                        setPost(fetchedPost);
                        dbService.getFileView(fetchedPost.featuredImage)
                            .then((url) => {
                                setPreviewUrl(url);
                            })
                            .catch((err) => {
                                console.error("Error fetching preview URL:", err);
                                setPreviewUrl(null);
                            });
                    } else {
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.error("Error fetching post:", err);
                    navigate("/");
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    if (!post) {
        return (
            <div className="text-center py-12 text-gray-500 text-lg animate-pulse">
                Loading post...
            </div>
        );
    }

    return (
        <div className="py-8 max-w-4xl mx-auto px-4">
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white shadow">
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt={post.title}
                        className="rounded-xl max-h-[500px] object-contain"
                    />
                ) : (
                    <div className="text-gray-400 italic">No preview available</div>
                )}
            </div>

            {/* Title with Edit & Delete buttons aligned right */}
            <div className="w-full mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                {isAuthor && (
                    <div className="flex gap-2">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500">Edit</Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            <div className="prose max-w-none">
                {post.content ? parse(post.content) : (
                    <p className="text-gray-500">No content available.</p>
                )}
            </div>
        </div>
    );
}

export default Post;
