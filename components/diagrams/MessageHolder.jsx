import React from "react";
import UserImage from "../UserImage";

const MessageHolder = ({ message, senderName, senderImageUrl, timestamp }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    if (date) {
      const formattedDate = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      return formattedDate;
    }
  };
  return (
    <div className="w-full flex flex-row gap-2">
      <UserImage
        image={senderImageUrl}
        alt={senderName}
        className="w-[40px] h-[40px] rounded-md object-cover object-center"
      />

      <div className="flex flex-col">
        <div className="flex flex-row items-end gap-1">
          <p className="font-extrabold text-green01 text-sm">{senderName}</p>
          <p className="text-gray-500 text-[0.8rem]">{formatDate(timestamp)}</p>
        </div>

        <p className="text-gray-700 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default MessageHolder;
