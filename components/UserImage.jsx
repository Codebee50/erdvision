import React from "react";
import user from "@/public/images/user-square.png";
import { useState } from "react";

const UserImage = ({ image, className = "", alt = "" }) => {
  const [imageSrc, setImageSrc] = useState(image);

  const handleError = () => {
    setImageSrc(user.src);
  };

  const getImage = () => {
    if (image && image !== "null") {
      return image;
    }
    return user.src;
  };
  return (
    <img src={getImage()} alt="" className={className} onError={handleError} />
  );
};

export default UserImage;
