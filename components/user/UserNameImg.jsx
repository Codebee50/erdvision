import React from "react";
import Image from "next/image";
const UserNameImg = ({image, username, email, className=""}) => {
  return (
    <div className={`flex flex-row items-center gap-3 ${className}`}>
      <Image width={40} height={40} alt={username} src={image} />

      <div className={`flex flex-col `}>
        <h3 className="font-semibold">{username}</h3>
        <p className="text-sm opacity-80">{email}</p>
      </div>
    </div>
  );
};

export default UserNameImg;
