import React, { useEffect, useState, useReducer, useRef } from "react";
import { RiMoreFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import DatatypeInput from "./DatatypeInput";
import { toast } from "@/hooks/use-toast";

const initialState = {
  columnName: "",
  columnId: "",
};

function columnChangedReducer(state, action) {
  switch (action.type) {
    case "COLUMN_NAME_CHANGED":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

const TableContent = ({
  table,
  selected,
  columnList = [],
  onTableNameChanged = () => {},
  onHeaderClicked = () => {},
  onColumnCreatedClicked = () => {},
  onColumnNameChanged = () => {},
  onColumnDatatypeChanged = () => {},
  onColumnPropertyChanged = () => {},
  typeList,
}) => {
  const [inputValue, setInputValue] = useState(null);
  const [column, dispatchColumnChanged] = useReducer(
    columnChangedReducer,
    initialState
  );

  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue && inputValue !== "") {
        onTableNameChanged(table.flow_id, inputValue);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onColumnNameChanged(column.columnId, table.flow_id, column.columnName);
    }, 1000);

    return () => clearTimeout(timer);
  }, [column.columnName]);

  const handleColumnNameChanged = (value, columnId) => {
    dispatchColumnChanged({
      type: "COLUMN_NAME_CHANGED",
      payload: {
        columnName: value,
        columnId: columnId,
      },
    });
  };
  const handleTableNameInputChanged = (e) => {
    setInputValue(e.target.value);
  };

  const handleColumnDatatypeChanged = (datatype, columnId) => {
    onColumnPropertyChanged(columnId, table.flow_id, {
      datatype,
    });
  };

  const handleSetColumnPrimaryKey = (columnId, isPrimaryKey = true) => {
    onColumnPropertyChanged(columnId, table.flow_id, {
      is_primary_key: isPrimaryKey,
    });
  };

  const handleSetColumnNullable = (column, isNullable = true) => {
    if (column.is_primary_key && isNullable) {
      toast({
        description: "Cannot make a primary key field nullable",
        variant: "destructive",
      });
      return;
    }
    onColumnPropertyChanged(column.flow_id, table.flow_id, {
      is_nullable: isNullable,
    });
  };

  useEffect(() => {
    if (selected && containerRef?.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selected]);
  return (
    <>
      <div className="flex flex-col" key={table.flow_id} ref={containerRef}>
        <div
          onClick={onHeaderClicked.bind(null, table.flow_id)}
          className="p-2 flex flex-row items-center justify-between cursor-pointer bg-[#F8FAFF] hover:bg-mgrey100 transition-all"
        >
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

        <div
          className={`flex flex-col transition-height ease-linear duration-300 w-full ${
            selected ? "flex" : "hidden"
          }`}
        >
          <div className={`w-full flex flex-col`}>
            {columnList
              .filter((column) => column.table_id === table.id)
              .map((column, index) => {
                return (
                  <div
                    className="w-full flex flex-row items-center justify-between p-2"
                    key={`tb-column-${index}`}
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div className="w-[9px] h-[9px] rounded-full border-[1.5px] border-[#EAEAEC]"></div>
                      <input
                        type="text"
                        name=""
                        id=""
                        defaultValue={column.name}
                        onInput={(e) => {
                          handleColumnNameChanged(
                            e.target.value,
                            column.flow_id
                          );
                        }}
                        className="max-w-[90px] text-[0.8rem] p-[5px] border border-mgrey200 outline-green02 rounded-md"
                      />

                      <DatatypeInput
                        typeList={typeList}
                        initialValue={column.datatype}
                        columnId={column.flow_id}
                        onInputChange={handleColumnDatatypeChanged}
                      />
                    </div>

                    <div
                      className="p-2 hover:bg-mgrey100 cursor-pointer transition-all ease-in-out rounded-sm"
                      title="Primary key"
                      onClick={handleSetColumnPrimaryKey.bind(
                        null,
                        column.flow_id,
                        !column.is_primary_key
                      )}
                    >
                      <p
                        className={`${
                          column.is_primary_key
                            ? "text-blue01"
                            : "text-[#474747] "
                        } text-[0.8rem] font-semibold`}
                      >
                        PK
                      </p>
                    </div>

                    <div
                      className="p-2 hover:bg-mgrey100 cursor-pointer transition-all ease-in-out rounded-sm"
                      title="Nullable"
                      onClick={handleSetColumnNullable.bind(
                        null,
                        column,
                        !column.is_nullable
                      )}
                    >
                      <p
                        className={`${
                          column.is_nullable ? "text-blue01" : "text-[#474747]"
                        } font-semibold text-[0.8rem]`}
                      >
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

          <div className="border-t-[0.4px] flex flex-row items-center justify-end p-2 gap-2">
            <button className="text-sm border p-2 rounded-md hover:bg-slate-100">
              Add index
            </button>
            <button
              className="text-sm border p-2 rounded-md hover:bg-slate-100"
              onClick={onColumnCreatedClicked.bind(null, table.flow_id)}
            >
              Add Column
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TableContent;
