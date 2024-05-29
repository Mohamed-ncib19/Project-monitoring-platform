import { useState } from 'react';
import clx from 'clsx';

const PasswordInput = ({ register, errors, placeholder }) => {
  const [visible, setVisible] = useState(false);

  const handleShowPassword = () => {
    setVisible((visible) => !visible);
  };

  return (
    <div
      className={clx('position-relative form-group form-floating', {
        'is-invalid': errors.password,
      })}
    >
      <input
        name="password"
        type={clx({ text: visible, password: !visible })}
        placeholder={placeholder}
        className={clx('form-control focus-blue-bottom-border rounded', {
          'is-invalid': errors.password,
          'text-danger': errors.password,
        })}
        {...register}
      />
      <label htmlFor="floating-input light-text-custom-color z-0">
        {placeholder}
      </label>

      <button
        type="button"
        className={clx(
          'input-group-button position-absolute end-0 top-0 bottom-0  z-index-999 border-none mx-2 px-2 my-2 rounded show-hide-password',
          {
            'mx-4': errors.password,
            'mb-5': errors.password,
            'mt-2': errors.password,
          },
        )}
        onClick={handleShowPassword}
      >
        <span className={clx({ 'px-2': errors.password })}>
          {visible ? (
            <i className="bi bi-eye-fill"></i>
          ) : (
            <i className="bi bi-eye-slash-fill"></i>
          )}
        </span>
      </button>

      {errors.password && (
        <p className="invalid-feedback">{errors.password.message}</p>
      )}
    </div>
  );
};

export default PasswordInput;
