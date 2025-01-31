import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DatatypeInput = ({ typeList = [], initialValue = "", columnId = "", onInputChange=()=>{} }) => {
  const handleSelectValueChange = (value) => {
    onInputChange(value, columnId)
  };

  return (
    <div>
      <Select onValueChange={handleSelectValueChange}>
        <SelectTrigger className="w-[80px] text-ellipsis">
          <SelectValue placeholder={initialValue} />
        </SelectTrigger>
        <SelectContent className="bg-green01">
          <div className="w-full bg-green01">
            {typeList.map((datatype) => {
              return (
                <SelectItem
                  key={`dbtype-${datatype}`}
                  value={datatype}
                  className={`flex flex-row items-center py-2 px-2 text-slate-400 hover:text-white cursor-pointer ${
                    datatype === initialValue && "bg-black text-white"
                  }`}
                >
                  <p>{datatype}</p>
                </SelectItem>
              );
            })}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DatatypeInput;
