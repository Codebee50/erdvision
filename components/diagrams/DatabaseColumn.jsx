import React from "react";
import { Handle, Position } from "@xyflow/react";


const DatabaseColumn = ({column}) => {

  return (
    <div className="relative ">
      <Handle type="target" position={Position.Left} isConnectable={true} id={`l-${column.id}`}/>
      <Handle type="source" position={Position.Left} isConnectable={true} id={`ls-${column.id}`}/>

      <div className="w-full h-[33px] bg-white flex flex-row items-center justify-between py-2 px-4 hover:bg-mgrey200 cursor-pointer">
        <p className="text-[#565656] text-[0.7rem]">{column?.name}</p>
        <p className="text-green02 text-[0.7rem]">{column?.datatype}</p>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={true} id={`r-${column.id}`}/>
      <Handle type="target" position={Position.Right} isConnectable={true} id={`rs-${column.id}`}/>
    </div>
  );
};

export default DatabaseColumn;
