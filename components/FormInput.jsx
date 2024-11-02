import React from 'react'

const FormInput = ({type="text", id="forminput", name="forminput", label="FormInput", placeholder="", className="", conClassName=""}) => {
  return (
    <div className={`mt-3 flex flex-col w-full ${conClassName}`}>
        <label htmlFor={name} className='text-[#727584]'>{label}</label>
        <input type={type} name={name} id={id} className={`bg-white p-4 border border-[#CCD4E3] rounded-lg mt-1 ${className}`} placeholder={placeholder}/>
    </div>
  )
}

export default FormInput