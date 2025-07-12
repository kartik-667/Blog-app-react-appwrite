import { useState } from 'react'
import './App.css'
import conf from '../conf'

function App() {
  let envval=conf.vite_test

  // console.log(envval);
  


  return (
    <>
     <h1>this is the blog app</h1>
     {envval && (
     <h2>val of env is {conf.appwrite_url}</h2>

     )}
    </>
  )
}

export default App
