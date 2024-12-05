import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectDatabaseTypes = () => {
  const databaseTypeList = [
    {
      name: "Mysql",
      value: "mysql"
    },
    {
      name: "Postgresql",
      value: 'postgresql'
    },
    {
      name: "Oracle",
      value: 'oracle'
    },
  ];
  return (
    <div className="w-full">
      <p className="text-mblack100 text-sm">Database type</p>
      <Select className="w-full" name="databaseType" defaultValue={databaseTypeList[0].value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a database type" />
        </SelectTrigger>
        <SelectContent className='w-full'>
          <SelectGroup>
            {databaseTypeList.map((item) => {
              return <SelectItem key={item.name} value={item.value}>{item.name}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDatabaseTypes;
