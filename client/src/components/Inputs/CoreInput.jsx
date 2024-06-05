import clx from 'clsx';

const CoreInput = ({
  name,
  placeholder,
  type = 'text',
  readOnly = false,
  errors,
  register,
  defaultValue,
  value,
  onChange
}) => {
  console.log(value)
  return (
    <>
      <div className="form-group form-floating">
        <input
          id={`floating-input-${name}`}
          type={type}
          name={name}
          readOnly={readOnly}
          placeholder={placeholder}
          className={clx('form-control focus-blue-bottom-border rounded', {
            'is-invalid': !readOnly && errors[name],
            'text-muted' : readOnly,
            'bg-light' : readOnly
          })}
          {...(readOnly ? {} : register(name))}
          defaultValue={defaultValue}
          value={value} 
          onChange={onChange || (() => {})}
        />

        {!readOnly && (
          <label
            htmlFor={`floating-input-${name}`}
            className="light-text-custom-color"
          >
            {placeholder}
          </label>
        )}

        {!readOnly && errors[name] && (
          <p className="invalid-feedback">
            {!readOnly && errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};

export default CoreInput;