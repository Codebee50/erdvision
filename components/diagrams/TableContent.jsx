import React, { useEffect, useState } from "react";
import { RiMoreFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TableContent = ({
  table,
  selected,
  columnList = [],
  onTableNameChanged = () => {},
}) => {
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue && inputValue !== "") {
        console.log(table.flow_id, inputValue);
        onTableNameChanged(table.flow_id, inputValue);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleTableNameInputChanged = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col" key={table.flow_id}>
        <div className="p-2 flex flex-row items-center justify-between cursor-pointer bg-[#F8FAFF] hover:bg-mgrey100 transition-all">
          <div className="flex flex-row items-center gap-2">
            <IoIosArrowForward size={12} />

            <div className="flex flex-col">
              <input
                onChange={handleTableNameInputChanged}
                type="text"
                defaultValue={table.name}
                className="text-[0.9rem] font-medium text-green-900 bg-[#F8FAFF] focus:outline-dashed focus:outline-[0.6px] focus:outline-green02"
              />
            </div>
          </div>

          <p className="text-[0.7rem] font-extralight text-green01">
            {columnList.filter((column) => column.table_id === table.id).length}{" "}
            cols
          </p>
        </div>

        <div className={`transition-height ease-linear duration-300 w-full overflow-y-hidden ${selected?"max-h-max": "h-[0]"}`}>
          <div
            className={`w-full flex flex-col`}
          >
            {columnList
              .filter((column) => column.table_id === table.id)
              .map((column, index) => {
                return (
                  <div
                    className="w-full flex flex-row items-center justify-between p-2"
                    key={`${column.name}${column.id}${index}`}
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div className="w-[9px] h-[9px] rounded-full border-[1.5px] border-[#EAEAEC]"></div>
                      <input
                        type="text"
                        name=""
                        id=""
                        defaultValue={column.name}
                        className="max-w-[90px] text-[0.8rem] p-[5px] border border-mgrey200 outline-green02 rounded-md"
                      />
                      <input
                        type="text"
                        defaultValue={column.datatype}
                        className="max-w-[90px] text-[0.8rem] p-[5px] border rounded-md border-mgrey100 outline-green02"
                      />
                    </div>

                    <div
                      className="p-2 hover:bg-mgrey100 cursor-pointer transition-all ease-in-out rounded-sm"
                      title="Primary key"
                    >
                      <p className="text-blue01 text-[0.8rem] font-semibold">
                        PK
                      </p>
                    </div>

                    <div
                      className="p-2 hover:bg-mgrey100 cursor-pointer transition-all ease-in-out rounded-sm"
                      title="Nullable"
                    >
                      <p className="text-[#474747] font-semibold text-[0.8rem]">
                        N
                      </p>
                    </div>

                    <div></div>
                    <div className="cursor-pointer">
                      <RiMoreFill />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default TableContent;
