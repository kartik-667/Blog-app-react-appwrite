import {  createContext, useState } from "react";


export const Mycontext=createContext()


export const ContextProvider=({children})=>{ //global state hai to avoid prop drilling
    const [loggedIn, setloggedIn] = useState(false)
    const [user, setuser] = useState("")
    const [test, settest] = useState("kartik from context")


    return (
        <Mycontext.Provider value={{loggedIn,setloggedIn,user,setuser,test,settest}} >
            {children}

        </Mycontext.Provider>

    )


}
