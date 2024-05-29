import { useState } from 'react';

/* import { IconEye, IconEyeOff } from '@tabler/icons-react';
 */

const PasswordInput = ({field, errors, placeholder }) => {
  const [visible, setVisible] = useState(false);

  const handleShowPassword = () => {
    setVisible((visible) => !visible);
  };

  return (
    <div
      className={`form-group form-floating position-relative w-100 ${errors.password  ? 'is-invalid' : ''}`}
    >
      <input
        type={visible ? 'text' : 'password'}
        className={`form-control focus-blue-bottom-border rounded position-relative ${
          errors.password ? 'is-invalid text-danger' : ''
        }`}
        placeholder={placeholder}
        onChange={field?.onChange}
        onBlur={field?.onBlur}
        name="password"
      />
      <label htmlFor="floating-input light-text-custom-color z-0">
        {placeholder}
      </label>

      <button
        type="button"
        className={`input-group-button position-absolute end-0 top-0 bottom-0  z-index-999 border-none mx-2 px-2 my-2 rounded show-hide-password ${errors.password ? 'mx-4  mb-5 mt-2' : ''} `}
        onClick={handleShowPassword}
      >
        <i className={`${errors.password ? 'px-2' : ''}`}>
          {/* {visible ? <IconEye /> : <IconEyeOff />} */}
        </i>
      </button>

      {errors.password && (
        <p className="invalid-feedback">{errors.password.message}</p>
      )}
    </div>
  );
};

export default PasswordInput;