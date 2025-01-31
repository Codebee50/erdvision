
"use client"
import React from "react";
import Loader from "./Loader";
import ShuffleLoader from "./ShuffleLoader";

const LoadableButton = ({ isLoading = false, label = "Button", type = "", onClick = ()=>{}, isFilled=true }) => {
  const filledClassName =
    "w-full p-4 rounded-md mt-5 cursor-pointer bg-green01 text-white text-center border-2 border-green01";

  const transparentClassName =
    "w-full p-4 rounded-md mt-5 cursor-pointer border-2 border-green01 text-green01 font-medium text-center";

  return (
    <button
    onClick={onClick}
      className={`flex flex-row items-center justify-center ${isFilled? filledClassName: transparentClassName} ${
        isLoading && "bg-mgrey100 border-mgrey100"
      }`}
    >
      {isLoading && <ShuffleLoader />}

      {!isLoading && <p>{label}</p>}
    </button>
  );
};

export default LoadableButton;
