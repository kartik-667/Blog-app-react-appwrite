import React from 'react'

function Input({label, type="text",className="",...props}) {

  return (
    <div>
      {label && (
        <label htmlFor="">{label}</label>
      )}
      <input type={type} className={`${className}`} {...props}  />
    </div>
  )
}

export default Input
