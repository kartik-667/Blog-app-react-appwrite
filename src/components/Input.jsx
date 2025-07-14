import React from 'react'

function Input({label, type="text",classname="",...props}) {

  return (
    <div>
      {label && (
        <label htmlFor="">{label}</label>
      )}
      <input type={type} className={`${classname}`} />
    </div>
  )
}

export default Input
