import './App.css'
import conf from '../conf'
import authService from './appwrite/auth'

function App() {
  let envval="123"

  return (
    <>
     <h1>this is the blog app</h1>
     <h1>i am in the app right now and testing the env variable</h1>
     <h1 className=''>i am creating login now</h1>
     {envval && (
     <h2>val of env is {conf.appwrite_url}</h2>
     
    )}
    <h2>val of env is {conf.project_id}</h2>
    </>
  )
}

export default App
