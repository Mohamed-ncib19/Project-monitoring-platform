import clsx from 'clsx';
import { useState, useEffect } from 'react';
import Select from 'react-select';

export const SelectInput = ({
  errors,
  name = '',
  register,
  options,
  placeholder,
  readOnly = false,
  defaultValue
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);

  };
  return (
    <div className="form-group">
      <Select
        name={name}
        placeholder={placeholder}
        value={selectedOption}
        {...(register && register(name))}
        defaultValue={defaultValue}
        className={clsx('form-control focus-blue-bottom-border rounded', {
          'is-invalid': errors && errors[name],
        })}
        classNamePrefix="select"
        isDisabled={readOnly}
        isSearchable={!readOnly}
        options={readOnly ? [] : options}
        onChange={handleChange}
      />
      {errors && errors[name] && (
        <p className="invalid-feedback">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
