import React from 'react'
import userImage from "@/public/images/user.png";
import Image from 'next/image';

const ProfileImage = ({src, width=40, height=40}) => {
  return (
    <Image width={width} height={height} className='rounded-full' alt="user" src={src?src:userImage.src}/>

  )
}

export default ProfileImage