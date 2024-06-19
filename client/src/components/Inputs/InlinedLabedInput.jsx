import clx from 'clsx';

const InlinedLabelInput = ({
  name,
  placeholder,
  type = 'text',
  readOnly = false,
  errors,
  register,
  defaultValue,
  value,
  onChange,
  InlineLabel
}) => {
  return (
    <>
      <div className="form-group form-floating position-relative">
        <input
          id={`floating-input-${name}`}
          type={type}
          name={name}
          readOnly={readOnly}
          placeholder={placeholder}
          className={clx('form-control focus-blue-bottom-border rounded position-relative', {
            'is-invalid': !readOnly && errors[name],
            'text-muted': readOnly,
            'bg-light': readOnly
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
        <span className="position-absolute bottom-0 end-0 h-100 d-flex bg-soft-gray border rounded-end-2 align-items-center px-4">
          {InlineLabel}
        </span>
        {!readOnly && errors[name] && (
          <p className="invalid-feedback">
            {!readOnly && errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};

export default InlinedLabelInput;
