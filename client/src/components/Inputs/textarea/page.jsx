import { useEffect, useRef, useState } from 'react';
import './textarea.styles.css';

const Textarea = ({ register, errors, placeholder, name, isValid, reff }) => {
  const [isValidExist, setIsValidExist] = useState(true);

  const elementRef = useRef(null); // Always use useRef

  useEffect(() => {
    if (isValid !== undefined) {
      setIsValidExist(isValid);
    }
  }, [isValid]);

  useEffect(() => {
    if (reff && elementRef.current) {
      elementRef.current.focus();
    }
  }, [reff, elementRef]); // Add elementRef to the dependency array

  return (
    <div
      className={`form-group form-floating mb-3 mb-2 w-100 z-0 ${
        errors[name] || !isValidExist ? 'is-invalid' : ''
      }`}
    >
      <textarea
        ref={reff ? elementRef : null} // Conditionally assign ref
        spellCheck
        rows={15}
        className={`form-control focus-blue-bottom-border rounded ${
          errors[name] || !isValidExist ? 'is-invalid text-danger' : ''
        }`}
        id={name}
        placeholder={placeholder}
        {...register}
      />
      <label htmlFor={name} className="light-text-custom-color">
        {placeholder}
      </label>
      {errors[name] && (
        <p className="invalid-feedback">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Textarea;
