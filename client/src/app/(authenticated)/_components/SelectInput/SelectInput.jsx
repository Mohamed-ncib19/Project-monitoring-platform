import { useState } from 'react';
import { Select } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

export const SelectInput = ({
  field,
  errors,
  content,
  name,
  placeholder,
  disabled,
  search
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (_, data) => {
    setSelectedOptions(data.value);
    field.onChange(data.value);
  };

  return (
    <div className="form-group">
      <Select
        disabled={disabled}
        placeholder={placeholder}
        className={`form-control focus-blue-bottom-border rounded ${
          errors[name] ? 'is-invalid' : ''
        }`}
        id={name + '-list'}
        search={search}
        options={content}
        value={selectedOptions}
        onChange={handleChange}
      />
      {errors[name] && (
        <p className="invalid-feedback">{errors[name].message}</p>
      )}
    </div>
  );
};
