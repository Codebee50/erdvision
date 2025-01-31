import React from "react";
import InputLabel from "./InputLabel";

const FormInput = ({
  type = "text",
  id = "forminput",
  name = "forminput",
  label = "FormInput",
  placeholder = "",
  className = "",
  conClassName = "",
  required = false,
  rootElement = "input",
  rows=4,
  cols=0
}) => {
  const getElement = () => {
    if (rootElement == "textarea") {
      return (
        <textarea
          name={name}
          id={id}
          className={`bg-white p-3 border border-mgrey100 rounded-lg mt-1 ${className}`}
          placeholder={placeholder}
          required={required}
          rows={rows}
        ></textarea>
      );
    }
    return (
      <input
        type={type}
        name={name}
        id={id}
        className={`bg-white p-3 border border-mgrey100 rounded-lg mt-1 ${className}`}
        placeholder={placeholder}
        required={required}
      />
    );
  };
  return (
    <div className={`mt-3 flex flex-col w-full ${conClassName}`}>
      <InputLabel name={name} label={label} />
      {getElement()}
    </div>
  );
};

export default FormInput;
