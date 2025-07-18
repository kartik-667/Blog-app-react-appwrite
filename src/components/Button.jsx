import React from 'react'

function Button({type, className,data,children}) {
  return (
   <button type={type || "button"} className={`${className} hover:bg-blue-300  text-black rounded-full transition-all px-6 py-2 duration-200`}>{children}</button>
  )
}

export default Button
