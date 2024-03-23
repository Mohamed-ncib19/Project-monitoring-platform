import { useEffect, useState } from "react";
import "./text-input.styles.css";

const Input = ({ register, errors, placeholder, name, type,isValid }) => {
  const [isValidExist,setIsValidExist] = useState(true);
  useEffect(() => {
    if (isValid !== undefined) {
        setIsValidExist(isValid);
    }
}, [isValid, setIsValidExist]);

  return (
    <div className={`form-group mb-2 w-100 ${(errors[name] || !isValidExist) ? "is-invalid" : ""} `}>
      <input
        type={type}
        className={`form-control focus-blue-bottom-border rounded p-2 ${(errors[name] || !isValidExist) ? "is-invalid text-danger" : ""}`}
        placeholder={placeholder}
        {...register} 
      />
      {errors[name] && <p className="invalid-feedback">{errors[name].message}</p>}
    </div>
  );
};

export default Input;