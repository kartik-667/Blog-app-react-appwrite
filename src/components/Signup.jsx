// import React, { useContext, useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { Mycontext } from '../../Mycontext'
// import authService from '../appwrite/auth'
// import { useForm } from 'react-hook-form'
// import Input from './Input'
// import Button  from './Button'


// function Signup() {
//     const {register, handleSubmit}=useForm()
//     const navigate=useNavigate()
//     const {setuser, setloggedIn}=useContext(Mycontext)
//     const [error, seterror] = useState("")

//     const signup= async (data)=>{
//         seterror("")
//         try {
//             const session=await authService.createUser(data)
//             if(session){
//                 const curruser=await authService.getCurrentUser()
//                 if(curruser){
//                     setuser(curruser)
//                     setloggedIn(true)

//                     navigate("/")

//                 }
//             }
            
//         } catch (error) {
//             seterror(error.message || "Signup error")
//             console.log("some error occured");
            
            
//         }

//     }

//   return (
//    <div className='flex items-center justify-center w-full'>
//         <div className='w-full mx-auto bg-gray-100 rounded-xl border'>
//             <div className='mb-2 flex justify-center'>
//                 <span className='inline-block w-full max-w-[100px]'>
//                     logo goes here
//                 </span>
//             </div>

//             <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>

//             <p>
//                 Already have an account ?
//                 <Link to="/login" className='hover:underline'>
//                     Log In
//                 </Link>
//             </p>

//             {/*  display erorr here */}
//             {error && (
//                 <p className='text-red-500 text-center mt-8'>{error} </p>

//             )}
//             <form  onSubmit={handleSubmit(signup)}>
//                 <Input label="Name:" placeholder="Enter your name" {...register("name",{
//                     required:true
//                 })}></Input>
//             <Input label="Email: " placeholder="Enter your email" 
//             {...register("email",{
//                 required:true,
//                 pattern: {
//             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//              message: "Invalid email format",
// }

                
//             })}  ></Input>

//             <Input type="password" placeholder="Enter password" label="Password: "  {...register("password", {required:true})}></Input>

//             <Button type="submit" className="text-black" data="Sign Up">Sign Up</Button>

//             </form>


             

//         </div>
      

//     </div>
//   )
// }

// export default Signup
import React, { useContext, useState, useEffect } from 'react'; // Added useEffect
import { useNavigate, Link } from 'react-router-dom';
import { Mycontext } from '../../Mycontext'; // Adjust path if necessary
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';


function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm(); // Added formState for validation errors
    const navigate = useNavigate();
    const { user, setuser, setloggedIn } = useContext(Mycontext); // Get 'user' from context to check login status
    const [error, seterror] = useState("");
    const [loading, setLoading] = useState(false); // Add a loading state for the button

    // Effect to check if user is already logged in when component mounts
    useEffect(() => {
        const checkUserStatus = async () => {
            if (user && user.$id) {
                navigate("/"); // Redirect to home/dashboard if already logged in
                return;
            }
            // Optional: If context 'user' might be delayed, fetch current status
            // const currentUser = await authService.getCurrentUser();
            // if (currentUser) {
            //     setuser(currentUser);
            //     setloggedIn(true);
            //     navigate("/");
            // }
        };
        checkUserStatus();
    }, [user, navigate, setuser, setloggedIn]); // Dependencies for useEffect

    const signup = async (data) => {
        seterror(""); // Clear any previous errors
        setLoading(true); // Set loading to true
        try {
            // authService.createUser now handles the auto-login and returns the session if successful
            const session = await authService.createUser(data);

            if (session) {
                console.log("Signup.jsx :: Session returned from createUser:", session);
                const curruser = await authService.getCurrentUser();
                if (curruser) {
                    console.log("Signup.jsx :: Current user obtained after signup:", curruser);
                    setuser(curruser); // Update user in context
                    setloggedIn(true); // Set loggedIn in context
                    navigate("/"); // Navigate to home page
                } else {
                    seterror("Signup successful, but failed to retrieve user details for automatic login.");
                    // Optional: If user account was created but login/getuser failed, log out the partial session
                    // await authService.logout();
                }
            } else {
                seterror("User creation succeeded, but no session was returned."); // This case should ideally be caught by Appwrite errors
            }
        } catch (err) {
            console.error("Signup.jsx :: Error during signup process:", err); // Use console.error
            seterror(err.message || "An unexpected error occurred during signup."); // Display actual error message
        } finally {
            setLoading(false); // Always turn off loading, regardless of success or failure
        }
    };

    return (
        <div className='flex items-center justify-center w-full min-h-screen p-4'>
            <div className='w-full max-w-lg mx-auto bg-white rounded-xl border border-gray-200 p-8 shadow-lg'> {/* Refined styling */}
                <div className='mb-6 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px] text-center text-gray-400'>
                        {/* Replace this with an actual logo image */}
                        Your Logo
                    </span>
                </div>

                <h2 className='text-center text-3xl font-extrabold text-gray-900 leading-tight mb-2'>
                    Create your account
                </h2>

                <p className='text-center text-base text-gray-600 mb-8'>
                    Already have an account?&nbsp; {/* &nbsp; for non-breaking space */}
                    <Link to="/login" className='font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200'>
                        Log In
                    </Link>
                </p>

                {/* Display server/Appwrite error */}
                {error && (
                    <p className='text-red-600 text-center mb-4 text-sm'>{error}</p>
                )}

                <form onSubmit={handleSubmit(signup)} className='space-y-6'> {/* Added spacing between form elements */}
                    <Input
                        label="Name:"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: "Name is required" // Specific error message
                        })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}

                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email" // Added type="email" for better browser validation
                        {...register("email", {
                            required: "Email is required", // Specific error message
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format", // Specific error message
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                    <Input
                        type="password"
                        placeholder="Enter password"
                        label="Password:"
                        {...register("password", {
                            required: "Password is required", // Specific error message
                            minLength: {
                                value: 8, // Example: enforce minimum password length
                                message: "Password must be at least 8 characters",
                            },
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3" // Adjusted button styling
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Signing Up..." : "Sign Up"} {/* Dynamic button text */}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;