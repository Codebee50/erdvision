import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { CgMoreVertical } from "react-icons/cg";
import { IoMdMore } from "react-icons/io";

import DatabaseColumn from "./DatabaseColumn";
import styled from "styled-components";

const Node = styled.div`
  .react-flow__handle {
    background: #7ed6df;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    // display: none;
  }
`;

const DatabaseTableNode = (props) => {
  return (
    <Node className="w-[210px] flex flex-col">
      <div className="w-full h-[33px] bg-[#F8FAFF] flex flex-row items-center justify-center  p-2">
        <div className="flex flex-row items-center gap-2 w-full">
          {/* <div className="w-[20px] h-[20px] bg-black rounded-sm"></div> */}
          <div className="flex flex-col">
            <p className="text-black text-[0.7rem] font-bold">
              {props.data.label}
            </p>
            {/* <p className="text-[0.5rem] opacity-50">Version 1</p> */}
          </div>
        </div>

        <div className="cursor-pointer">
          <IoMdMore size={15} />
        </div>
      </div>

      <div className="w-full flex flex-col">
        {props.data?.columns?.map((column) => {
          return <DatabaseColumn key={column.id} column={column} />;
        })}
        {/* <DatabaseColumn /> */}
      </div>
      <div className="w-full bg-[#E0BA34] h-[2px]"></div>
    </Node>
  );
};

export default memo(DatabaseTableNode);
