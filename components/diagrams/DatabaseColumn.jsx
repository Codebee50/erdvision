import React from "react";
import { Handle, Position } from "@xyflow/react";
import { GoKey } from "react-icons/go";

const DatabaseColumn = ({ column }) => {
  const getJsonId = (prefix) => {
    // return JSON.stringify({
    //   id: column.id,
    //   prefix: prefix,
    // })

    return `${column.id}-${prefix}`;
  };

  return (
    /**
     * lt = left target
     * ls = left source
     * rt = right target
     * rs = right source
     */
    <div className="relative ">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
        id={getJsonId("lt")}
      />
      <Handle
        type="source"
        position={Position.Left}
        isConnectable={true}
        id={getJsonId("ls")}
      />

      <div className="w-full h-[33px] bg-white flex flex-row items-center justify-between py-2 px-4 hover:bg-mgrey200 cursor-pointer">
        <div className="flex flex-row items-center gap-1">
          <p className="text-[#565656] text-[0.7rem]">{column?.name}</p>
          {column.is_primary_key ? (
            <GoKey size={9} color="#042028" className="opacity-50" />
          ) : (
            <div></div>
          )}
        </div>
        <p className="text-green02 text-[0.7rem]">{column?.datatype}{column.is_nullable&&"?"}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={true}
        id={getJsonId("rs")}
      />
      <Handle
        type="target"
        position={Position.Right}
        isConnectable={true}
        id={getJsonId("rt")}
      />
    </div>
  );
};

export default DatabaseColumn;
