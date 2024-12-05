import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InputLabel from "./InputLabel";

const SelectVisibility = () => {
  const visibilityList = [
    {
      label: "Public",
      value: "public",
    },
    {
      label: "Private",
      value: "private",
    },
  ];
  return (
    <div>
      <InputLabel name="visibility" label="Visibility"/>
      <RadioGroup defaultValue={visibilityList[0].value} className="mt-2" name="visibility">
        {visibilityList.map((item) => (
          <div className="flex items-center space-x-2" key={item.label}>
            <RadioGroupItem value={item.value} id={item.value} />
            <Label htmlFor={item.label}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SelectVisibility;
