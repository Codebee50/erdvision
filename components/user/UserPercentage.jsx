import React from 'react'

const UserPercentage = ({percentage, text}) => {
  return (
    <div className='w-full flex flex-col max-w-[75%]'>
        <h1 className='text-5xl font-bold '>{percentage}%</h1>
        <p className='font-light text-sm'>{text}</p>
    </div>

  )
}

export default UserPercentage