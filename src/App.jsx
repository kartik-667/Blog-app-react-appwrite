import './App.css'
import conf from '../conf'
import authService from './appwrite/auth'
import { useContext, useEffect, useState } from 'react'
import { Mycontext } from '../Mycontext'
import Header from './components/Header/Header'
import Input from './components/Input'
import Postcard from './components/Postcard'


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

    {/* <Postcard/> */}
    
     <h1>this is the blog app</h1>
     <button onClick={()=> adduser("kartik@667.com","12345678","kartik")}> add user here </button>
    
     <h1>i am in the app right now and testing the env variable</h1>
     <h1 className=''>i am creating login now</h1>
     {envval && (
     <h2>val of env is {conf.appwrite_url}</h2>
     
    )}
    <h1>the user is {user}</h1>
    <h2>val of env is {conf.project_id}</h2>
    </>
  )
}

export default App
