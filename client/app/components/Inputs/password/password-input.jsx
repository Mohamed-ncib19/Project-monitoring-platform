import { IconEyeOff, IconEye } from "@tabler/icons-react";
import "./password-input.styles.css";
import { useState } from "react";

const PasswordInput = ({ register, errors,isValid ,placeholder}) => {
  const [visible, setVisible] = useState(false);

  const handleShowPassword = () => {
    setVisible((visible) => !visible);
  };

  return (
    <div>
      <div className={`input-group position-relative d-flex align-items-center mb-3 ${(errors.password || !isValid) ? 'is-invalid' : ''}`}>
      <input
  type={visible ? "text" : "password"}
  className={`form-control focus-blue-bottom-border rounded p-2 ${(errors.password || !isValid) ? "is-invalid" : ""}`}
  placeholder={placeholder}
  name="password"
  {...register}
/>


        <button
          type="button"
          className="input-group-button position-absolute end-0 z-index-999 border-none px-2 py-1 mx-2 rounded show-hide-password"
          onClick={handleShowPassword}
        >
        <i className={` ${(errors.password || !isValid)? "p-3" : ""}`} >{visible ? <IconEye /> : <IconEyeOff />}</i>
         </button>
      </div>
      {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
    </div>
  );
};

export default PasswordInput;
