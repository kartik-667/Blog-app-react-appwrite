import React from 'react'

function Select({options,className,label,...props}) {
  return (
    <div>
        {label && (
            <label htmlFor="">{label}</label>

        )}

      <select name="" id="" className={` ${className}px-3 py-2 rounded-lg  text-black
      border border-gray-200 items-center focus:bg-gray-50 transition duration-200`}>
        
        {options?.map((element)=> (

            <option className='text-black' key={element} value={element} >{element}</option>


        ))}


      </select>
    </div>
  )
}

export default Select
