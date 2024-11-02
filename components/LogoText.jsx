import React from 'react'
import logo from "@/public/images/logo.svg"

const LogoText = () => {
  return (
    <div className='flex flex-row items-center gap-3'>
        <img src={logo.src}></img>
        <p className='text-white'>SQLVision</p>
    </div>
  )
}

export default LogoText