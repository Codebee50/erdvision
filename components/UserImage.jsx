import React from "react";
import user from "@/public/images/user-square.png";
import { useState } from "react";
import userImage from "@/public/images/user.png";

const UserImage = ({ image, className = "", alt = "", rounded = false }) => {
  const [imageSrc, setImageSrc] = useState(image);

  const handleError = () => {
    setImageSrc(rounded ? userImage.src : user.src);
  };

  const getImage = () => {
    if (image && image !== "null") {
      return image;
    }
    return rounded ? userImage.src : user.src;
  };
  return (
    <img src={getImage()} alt="" className={className} onError={handleError} />
  );
};

export default UserImage;
