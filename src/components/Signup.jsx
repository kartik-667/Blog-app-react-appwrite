import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mycontext } from '../../Mycontext'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Button  from './Button'


function Signup() {
    const {register, handleSubmit}=useForm()
    const navigate=useNavigate()
    const {setuser, setloggedIn}=useContext(Mycontext)
    const [error, seterror] = useState("")

    const signup= async (data)=>{
        seterror("")
        try {
            const session=await authService.createUser(data)
            if(session){
                const curruser=await authService.getCurrentUser()
                if(curruser){
                    setuser(curruser)
                    setloggedIn(true)

                    navigate("/")

                }
            }
            
        } catch (error) {
            seterror(error.message || "Signup error")
            console.log("some error occured");
            
            
        }

    }

  return (
   <div className='flex items-center justify-center w-full'>
        <div className='w-full mx-auto bg-gray-100 rounded-xl border'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    logo goes here
                </span>
            </div>

            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>

            <p>
                Already have an account ?
                <Link to="/login" className='hover:underline'>
                    Log In
                </Link>
            </p>

            {/*  display erorr here */}
            {error && (
                <p className='text-red-500 text-center mt-8'>{error} </p>

            )}
            <form  onSubmit={handleSubmit(signup)}>
                <Input label="Name:" placeholder="Enter your name" {...register("name",{
                    required:true
                })}></Input>
            <Input label="Email: " placeholder="Enter your email" 
            {...register("email",{
                required:true,
                pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
             message: "Invalid email format",
}

                
            })}  ></Input>

            <Input type="password" placeholder="Enter password" label="Password: "  {...register("password", {required:true})}></Input>

            <Button type="submit">Sign Up</Button>

            </form>


             

        </div>
      

    </div>
  )
}

export default Signup
