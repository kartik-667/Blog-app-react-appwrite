// import React, { useContext, useState } from 'react'
// import { Link,useNavigate } from 'react-router-dom'
// import authService from '../appwrite/auth'
// import { useForm } from 'react-hook-form'
// import { Mycontext } from '../../Mycontext'
// import Input from './Input'
// import Button  from './Button'


// function Login() {
//     const navigate=useNavigate()
//     const {setloggedIn,  setuser}=useContext(Mycontext)
//     const {register, handleSubmit}=useForm()
//     const [error, seterror] = useState("")

//     const login =async  (data)=>{
//         seterror("")
//         try {
//             const session=await authService.login(data)
//             if(session){
//                 const curruser=await authService.getCurrentUser()
//                 if(curruser){
//                     setloggedIn(true)
//                     setuser(curruser)

//                     navigate("/") //goes to home page after successful login

//                 }

//             }
            
//         } catch (error) {
//             console.log("error occured",error);
//             seterror(error.message || "Login error")
            
            
//         }

//     }


    




//   return (
//     <div className='flex items-center justify-center w-full'>
//         <div className='w-full mx-auto bg-gray-100 rounded-xl border'>
//             <div className='mb-2 flex justify-center'>
//                 <span className='inline-block w-full max-w-[100px]'>
//                     logo goes here
//                 </span>
//             </div>

//             <h2 className='text-center text-2xl font-bold leading-tight'>Log in to your account</h2>

//             <p>
//                 Dont have an account ?
//                 <Link to="/signup" className='hover:underline'>
//                     Sign Up
//                 </Link>
//             </p>

//             {/*  display erorr here */}
//             {error && (
//                 <p className='text-red-500 text-center mt-8'>{error} </p>

//             )}
//             <form  onSubmit={handleSubmit(login)}>
//             <Input label="Email: " placeholder="Enter your email" 
//             {...register("email",{
//                 required:true,
//                pattern: {
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: "Invalid email format",
//                 }

                
//             })}  ></Input>

//             <Input type="password" placeholder="Enter password" label="Password: "  {...register("password", {required:true})}></Input>
//             <Button type="submit" data="Log In"></Button>

//             </form>


             

//         </div>
      

//     </div>
//   )
// }

// export default Login
// src/components/Login.jsx (Conceptual)
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mycontext } from '../../Mycontext';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { user, setuser, setloggedIn } = useContext(Mycontext); // Get 'user' from context too
    const [error, seterror] = useState("");
    const [loading, setLoading] = useState(false);

    // Effect to check login status on component mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            // If Mycontext already indicates logged in, redirect
            if (user && user.$id) { // Check if user object exists and has an ID
                console.log(user.name);
                
                navigate("/"); // Redirect to home/dashboard if already logged in
                return;
            }
            // Optional: Re-fetch current user to be sure, in case context is not up-to-date
            // const currentUser = await authService.getCurrentUser();
            // if (currentUser) {
            //     setuser(currentUser);
            //     setloggedIn(true);
            //     navigate("/");
            // }
        };
        checkLoginStatus();
    }, [user, navigate, setuser, setloggedIn]); // Add dependencies

    const handleLogin = async (data) => {
        seterror("");
        setLoading(true);
        try {
            const res=await authService.logout()


            const session = await authService.login(data); // Call your login service

            if (session) {
                const curruser = await authService.getCurrentUser();
                if (curruser) {
                    setuser(curruser);
                    setloggedIn(true);
                    navigate("/"); // Navigate to home/dashboard on successful login
                } else {
                    seterror("Login successful, but failed to retrieve user details.");
                    // Consider logging out the session created if user details can't be fetched
                    await authService.logout();
                }
            } else {
                seterror("Login failed. No session returned.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            // AppwriteException will have a message property
            seterror(err.message || "An unexpected error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center w-full min-h-screen p-4'>
            <div className='w-full max-w-lg mx-auto bg-white rounded-xl border border-gray-200 p-8 shadow-lg'>
                {/* ... (Your existing Login form UI similar to Signup) ... */}
                <h2 className='text-center text-3xl font-extrabold text-gray-900 leading-tight mb-2'>
                    Log in to your account
                </h2>
                <p className='text-center text-base text-gray-600 mb-8'>
                    Don't have an account?&nbsp;
                    <Link to="/signup" className='font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200'>
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className='text-red-600 text-center mb-4 text-sm'>{error}</p>
                )}

                <form onSubmit={handleSubmit(handleLogin)} className='space-y-6'>
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                    <Input
                        type="password"
                        placeholder="Enter password"
                        label="Password:"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3"
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;