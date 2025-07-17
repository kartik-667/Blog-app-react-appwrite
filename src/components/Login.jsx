import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Mycontext } from '../../Mycontext'
import Input from './Input'
import Button  from './Button'


function Login() {
    const navigate=useNavigate()
    const {setloggedIn,  setuser}=useContext(Mycontext)
    const {register, handleSubmit}=useForm()
    const [error, seterror] = useState("")

    const login =async  (data)=>{
        seterror("")
        try {
            const session=await authService.login(data)
            if(session){
                const curruser=await authService.getCurrentUser()
                if(curruser){
                    setloggedIn(true)
                    setuser(curruser)

                    navigate("/") //goes to home page after successful login

                }

            }
            
        } catch (error) {
            console.log("error occured",error);
            seterror(error.message || "Login error")
            
            
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

            <h2 className='text-center text-2xl font-bold leading-tight'>Log in to your account</h2>

            <p>
                Dont have an account ?
                <Link to="/signup" className='hover:underline'>
                    Sign Up
                </Link>
            </p>

            {/*  display erorr here */}
            {error && (
                <p className='text-red-500 text-center mt-8'>{error} </p>

            )}
            <form  onSubmit={handleSubmit(login)}>
            <Input label="Email: " placeholder="Enter your email" 
            {...register("email",{
                required:true,
               pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
                }

                
            })}  ></Input>

            <Input type="password" placeholder="Enter password" label="Password: "  {...register("password", {required:true})}></Input>
            <Button type="submit">Log In</Button>

            </form>


             

        </div>
      

    </div>
  )
}

export default Login
