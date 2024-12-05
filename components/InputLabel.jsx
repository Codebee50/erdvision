import React from "react";

const InputLabel = ({name='', label=''}) => {
  return (
    <label htmlFor={name} className="text-[#727584] text-sm">
      {label}
    </label>
  );
};

export default InputLabel;
