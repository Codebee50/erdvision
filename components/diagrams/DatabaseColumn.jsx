import React from "react";
import { Handle, Position } from "@xyflow/react";


const DatabaseColumn = () => {

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} isConnectable={true} />

      <div className="w-full h-[33px] bg-white flex flex-row items-center justify-between py-2 px-4 hover:bg-mgrey200 cursor-pointer">
        <p className="text-[#565656] text-[0.7rem]">username</p>
        <p className="text-green02 text-[0.7rem]">varchar</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default DatabaseColumn;
