import React from 'react'
import InputLabel from './InputLabel'

const FormInput = ({type="text", id="forminput", name="forminput", label="FormInput", placeholder="", className="", conClassName=""}) => {
  return (
    <div className={`mt-3 flex flex-col w-full ${conClassName}`}>
        <InputLabel name={name} label={label}/>
        <input type={type} name={name} id={id} className={`bg-white p-3 border border-mgrey100 rounded-lg mt-1 ${className}`} placeholder={placeholder}/>
    </div>
  )
}

export default FormInput