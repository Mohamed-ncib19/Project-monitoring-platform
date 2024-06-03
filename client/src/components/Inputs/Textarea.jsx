import clsx from 'clsx';

const TextareaInput = ({
  name,
  placeholder,
  readOnly = false,
  errors,
  register,
  defaultValue,
  rows = 10,  
  cols = 50   
}) => {
  return (
    <div className="form-group form-floating">
      <textarea 
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        cols={cols}
        className={clsx('form-control focus-blue-bottom-border rounded z-0', {
          'is-invalid': !readOnly && errors[name]
        })}
        {...(readOnly ? {} : register(name))}
        defaultValue={defaultValue}
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
  );
};

export default TextareaInput;
