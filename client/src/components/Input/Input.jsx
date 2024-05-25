import { useEffect, useRef, useState } from 'react';

export const Input = ({
  register,
  errors,
  placeholder,
  name,
  type,
  isValid,
  value,
  reff,
}) => {
  const [isValidExist, setIsValidExist] = useState(true);
  const elementRef = useRef(null);

  useEffect(() => {
    if (isValid !== undefined) {
      setIsValidExist(isValid);
    }
  }, [isValid, setIsValidExist]);

  useEffect(() => {
    if (reff && elementRef.current) {
      elementRef.current.focus();
    }
  }, [reff, elementRef]);

  return (
    <div
      className={`form-group form-floating mb-3 mb-2 w-100 z-0 ${
        errors[name] || !isValidExist ? 'is-invalid' : ''
      } `}
    >
      <input
        ref={reff ? elementRef : null}
        type={type}
        defaultValue={value}
        className={`form-control focus-blue-bottom-border rounded   ${
          errors[name] || !isValidExist ? 'is-invalid text-danger' : ''
        }`}
        id="floating-input"
        placeholder={placeholder}
        {...register}
      />
      <label htmlFor="floating-input" className="light-text-custom-color">
        {placeholder}
      </label>
      {errors[name] && (
        <p className="invalid-feedback">{errors[name].message}</p>
      )}
    </div>
  );
};

