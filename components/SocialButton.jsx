'use client'

import React from 'react';
import Image from "next/image";

function SocialButton({image, title, onclick=()=>{}}) {
    return (
        <div onClick={onclick} className={'flex cursor-pointer flex-row items-center bg-white border rounded-xl border-[#D9E3F4] py-4 p-8 gap-2'}>
            <Image src={image} alt={title} width={26} height={26}/>
            <p className={'text-black font-semibold'}>{title}</p>
        </div>
    );
}

export default SocialButton;