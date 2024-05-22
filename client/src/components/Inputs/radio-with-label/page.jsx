import { useState } from 'react';

const RadioWithLabel = ({ register, label }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const handleCheckboxChange = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <div className="form-check form-switch form-group">
      <label
        className="form-check-label"
        htmlFor="mySwitch"
        onClick={handleCheckboxChange}
      >
        <input
          className="form-check-input"
          type="checkbox"
          id="mySwitch"
          checked={isDarkMode}
          {...register}
        />
        {label}
      </label>
    </div>
  );
};

export default RadioWithLabel;
