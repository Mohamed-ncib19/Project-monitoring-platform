'use client'
import "./select-input.styles.css";
import { Select } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { useState } from "react";
const SelectInput = ({ errors, content, name, placeholder, setValue, search, hookForm ,disabled}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event, data) => {
    setSelectedOptions(data.value);
    setValue(name, data.value);
    setSelectedValue(data.value);
  };

  const getData = (event, data) => {
    const selectedValue = data.value;
    setSelectedValue(selectedValue);
    return selectedValue;
  };

  return (
    <div className=" form-group">
      <Select 
      disabled={disabled}
        placeholder={placeholder}
        className={`form-control focus-blue-bottom-border rounded ${hookForm ? (errors[name] ? "is-invalid" : "") : ''}`}
        id={placeholder + '-list'}
        search={search}
        options={content}
        value={selectedOptions}
        onChange={hookForm ? handleChange : getData}
      />
      {hookForm && errors[name] && <p className="invalid-feedback">{errors[name].message}</p>}
      
    </div>
  );
};

export default SelectInput;