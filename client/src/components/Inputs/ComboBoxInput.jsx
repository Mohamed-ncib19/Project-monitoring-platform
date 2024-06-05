import clx from 'clsx';

const ComboBoxInput = ({
  name,
  placeholder,
  type = 'text',
  readOnly = false,
  errors,
  register,
  defaultValue,
  options
}) => {
  return (
    <>
      <div className="form-group form-floating">
        
          <div className="input-group">
            <input
              id={`floating-input-${name}`}
              type={type}
              name={name}
              readOnly={readOnly}
              min={type === 'number' ? 0 : ''}
              placeholder={placeholder}
              className={clx('form-control focus-blue-bottom-border rounded p-3 w-75', {
                'is-invalid': !readOnly && errors[name],
                'text-muted' : readOnly,
                'bg-light' : readOnly
              })}
              {...(readOnly ? {} : register(name))}
              defaultValue={defaultValue}
            />
            {!readOnly && (
              <select
                name={`${name}-currency`}
                className="form-select  w-25 "
                
                {...register(`currency`)}
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>


        {!readOnly && errors[name] && (
          <p className="invalid-feedback">
            {!readOnly && errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};

export default ComboBoxInput;
