import './App.css'
import conf from '../conf'
import authService from './appwrite/auth'
import { useContext, useEffect, useState } from 'react'
import { Mycontext } from '../Mycontext'
import Header from './components/Header/Header'
import Input from './components/Input'
import Postcard from './components/Postcard'
import Signup from './components/Signup'
import Login from './components/Login'
import Postform from './components/post-form/Postform'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import AuthLayout from './components/AuthLayout'
import Allposts from './components/pages/Allposts'
import Editpost from './components/pages/Editpost'
import Post from './components/pages/Post'
import Addpost from './components/pages/Addpost'

function App() {
  let envval="123"
  const [loading, setloading] = useState(false)
  const {user,setuser,loggedIn, setloggedIn,test}=useContext(Mycontext)
  if(test) console.log(test);

  async function adduser(email,password,name){
    try {
      const res=await authService.createUser(email,password,name)   
      console.log("the new user is ",res);
      if(res){
        setuser(res)
        setloggedIn(true)

      }
         
    } catch (error) {
      console.log(error);
      
    }

  }
  async function handlelogout(){
    const res=await authService.logout()
    if(res){
      setuser("")
      setloggedIn(false)
    }
  }
  

  useEffect(()=>{
    setloading(true)
    authService.getCurrentUser().then((userdata)=>{
      
      if(userdata) console.log(userdata);
      else console.log("user is not logged in");
      
      

    }).finally(()=>{
      setloading(false)
    })

  },[]) //once on page load only

  return (
    <>
    <Header></Header>
    
    <Routes>
      <Route path='/' element={<Home />}></Route>

      <Route path='/login' element={
        <AuthLayout authentication={false}>
          <Login></Login>
           </AuthLayout>
      }></Route>
      <Route path='/signup' element={
        <AuthLayout authentication={false}>
          <Signup></Signup>
           </AuthLayout>
      }></Route>

      <Route path='/all-posts' element={
        <AuthLayout authentication>
          <Allposts></Allposts>
          

        </AuthLayout>
      }></Route>

      <Route path='/edit-post/:slug' element={
        <AuthLayout authentication>
          <Editpost></Editpost>
          

        </AuthLayout>
      }></Route>

      <Route path='/post/:slug' element={<Post></Post>}>

      </Route>

      <Route path='/add-post' element={
         <AuthLayout authentication>
          <Addpost></Addpost>
          

        </AuthLayout>

      }></Route>
      
      </Routes>
    
    
    </>
  )
}

export default App
