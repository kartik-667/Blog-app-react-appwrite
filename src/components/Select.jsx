import React from 'react'

function Select({options,classname,label,...props}) {
  return (
    <div>
        {label && (
            <label htmlFor="">{label}</label>

        )}

      <select name="" id="" className='px-3 py-2 rounded-lg bg-white text-black
      border border-gray-200 items-center focus:bg-gray-50 transition duration-200'>
        
        {options?.map((element)=> (

            <option key={element} value={element} >{element.name}</option>


        ))}


      </select>
    </div>
  )
}

export default Select
