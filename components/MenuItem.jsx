import React from "react";

const MenuItem = ({text=""}) => {
  return (
    <button className="hover:text-green02 hover:bg-green02transparent text-mgrey100 p-2 rounded-md text-sm">
      <p className="">{text}</p>
    </button>
  );
};

export default MenuItem;
