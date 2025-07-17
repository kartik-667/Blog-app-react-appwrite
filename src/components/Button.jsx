import React from 'react'

function Button({type, className}) {
  return (
   <button type={type || "button"} className={`${className} hover:bg-blue-300 rounded-full transition-all px-6 py-2 duration-200`}></button>
  )
}

export default Button
