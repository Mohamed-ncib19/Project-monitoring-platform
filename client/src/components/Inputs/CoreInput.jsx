const CoreInput = ({
  field,
  errors,
  placeholder,
  name,
  type,
  readOnly,
}) => {
 

  return (
    <div
      className={`form-group form-floating mb-3 mb-2 w-100 z-0 ${
        !readOnly && (errors?.[name] ? 'is-invalid' : '')
      } `}
    >
      <input
        readOnly={readOnly}
        type={type}
        value={field?.value || ''}
        onChange={field?.onChange}
        onBlur={field?.onBlur}
        ref={field?.ref}
        className={`form-control focus-blue-bottom-border rounded z-0 ${
          !readOnly ? (errors?.[name] ? 'is-invalid' : '') : 'read-only-input'
        }`}
        id={`floating-input-${name}`}
        placeholder={placeholder}
        name={name}
      />

      {!readOnly && (
        <label htmlFor={`floating-input-${name}`} className="light-text-custom-color">
          {placeholder}
        </label>
      )}

      {!readOnly && errors?.[name] && (
        <p className="invalid-feedback">{errors[name].message}</p>
      )}
    </div>
  );
};

export default CoreInput;
