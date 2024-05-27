'use clients';
import { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

const SelectMultipleInput = ({
  options,
  errors,
  name,
  setValue,
  placeholder,
  disabled,
  defaultValue,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);

  const handleChange = (event, data) => {
    setSelectedOptions(data.value);
    setValue(name, data.value);
  };

  useEffect(() => {
    setSelectedOptions(defaultValue || []);
  }, [defaultValue]);

  return (
    <div>
      <Dropdown
        disabled={disabled}
        placeholder={placeholder}
        className={`form-control focus-blue-bottom-border rounded p-2 mb-3 ${errors[name] ? 'is-invalid' : ''}`}
        id={placeholder + '-list'}
        fluid
        multiple
        selection
        search
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
      {errors[name] && (
        <p className="invalid-feedback">{errors[name].message}</p>
      )}
    </div>
  );
};

export default SelectMultipleInput;
