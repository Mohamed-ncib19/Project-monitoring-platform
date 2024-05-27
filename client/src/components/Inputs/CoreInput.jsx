const CoreInput = ({
  register,
  errors,
  placeholder,
  name,
  type,
  value,
  readOnly
}) => {



  const registerProps = !readOnly ? register(name) : {};

  return (
    <>
    <div
      className={`form-group form-floating mb-3 mb-2 w-100 z-0 ${
        !readOnly && (errors[name] ? 'is-invalid' : '')
      } `}
    >
      <input
        readOnly={readOnly}
        type={type}
        defaultValue={value}
        className={`form-control focus-blue-bottom-border rounded z-0 ${
          !readOnly ? (errors[name] ? 'is-invalid' : '') : 'read-only-input'
        }`}
        id={`floating-input-${name}`}
        placeholder={placeholder}
        {...registerProps}
      />

      {!readOnly && (
      <label htmlFor={`floating-input-${name}`} className="light-text-custom-color ">
        {placeholder}
      </label>
      )}
      
      {!readOnly &&
      errors[name] && (
        <p className="invalid-feedback">{!readOnly && errors[name].message}</p>
      )}
    </div>
    </>
  );
};

export default CoreInput;
