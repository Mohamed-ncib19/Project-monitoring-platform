import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './select-multiple.styles.css';
import { useState, useEffect } from 'react';

const SelectMultiple = ({ register,options, errors, name,setValue }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event, data) => {
    setSelectedOptions(data.value);
    setValue(name, data.value);
  };


  return ( 
    <div>
      <Dropdown 
        placeholder='Skills'
        className={`form-control focus-blue-bottom-border rounded p-2 mb-3 ${errors[name] ? "is-invalid" : ""}`}
        id='skills-list'
        fluid
        multiple
        selection
        search
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
      {errors[name] && <p className="invalid-feedback">{errors[name].message}</p>}
    </div>
  );
}
 
export default SelectMultiple;
