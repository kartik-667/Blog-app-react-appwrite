import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Mycontext } from '../../../Mycontext'
import dbService from '../../appwrite/db'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import RTE from '../RTE'


function Postform({post}) {
    const {user}=useContext(Mycontext)
    const navigate=useNavigate()

    const userdata=user //comes from global state of context

    const {register, handleSubmit, watch, setValue, control, getValues}=useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.slug || "",
            content:post?.content || "",
            status:post?.status || "active",
            //these all act as usestate , provided by useForm


        }
    })

    const submit=async (data)=>{
        //incase post already exist
        if(post){
            const file=data.image[0] ? await  dbService.uploadFile(data.image[0]) : null;

            if(file){
                await dbService.deleteFile(post.featuredImage)
            }
            const dbPost=await dbService.updatePost(post.$id, {
                ...data,
                featuredImage:file ? file.$id : undefined,
            })

            if(dbPost){
                //then navigate
                navigate(`/post/${dbPost.$id}`)
            }


        }else{
            const newfile=await dbService.uploadFile(data.image[0])

            if(newfile){
                const fileId=newfile.$id
                data.featuredImage=fileId
                const newdbPost=await dbService.createPost({
                    ...data,
                    userId:userdata.$id
                })

                if(newdbPost){
                    navigate(`/post/${newdbPost.$id}`)
                }


            }

        }

    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof value==="string"){
            return value.trim().toLowerCase().
            replace(/^[a-zA-Z\d\s]+/g,'-')
            .replace(/\s/g,'-')
        }
        return ""

    },[])




   useEffect(() => {
    const subscription=watch((value,{name})=>{
        if(name==="title"){
            setValue('slug',slugTransform(value.title))
        }

    })
    
    return ()=>{
        subscription.unsubscribe()
    }


     
   }, [slugTransform, watch, setValue])
    


  return (
    <form onSubmit={handleSubmit(submit)}>
        <div className='w-2/3 px-2'>
            <Input label="Title: " placeholder="Title" className="mb-4" {...register('title',{
                required:true
            })} />

            <Input onInput={(e)=>{
                setValue("slug",slugTransform(e.currentTarget.value))

            }} label="Slug: " placeholder="Slug"
            className="mb-4" {...register("slug",{
                required:true
            })}  />

            {/* add RTE editor here */}
            <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} ></RTE>
        
         </div>
         <div className='w-1/3 px-2'>
            <Input label="Featured Image:" type="file"
                className='mb-4' accept="image/png, image/jpg , image/jpeg, image/gif"

                {...register('image',{required:!post})}

            /> 
            {post && (
                <div className="w-full mb-4">
                    <img className='rounded-lg' src={dbService.getFilePreview(post.featuredImage)} alt={post.title} />
                </div>
            )}
            <Select options={["Active","Inactive"]}
            label="Status"
            className="mb-4"
            {...register("status",
                {required:true}
            )} />
            <Button className='w-full' type="submit">
                {post ? "Update":"Submit"}
            </Button>
            


         </div>


    </form>
  )
}

export default Postform
