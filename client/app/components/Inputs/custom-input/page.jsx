import "./text-input.styles.css";

const Input = ({ register, errors, placeholder, name,type }) => {
console.log(errors)
return (
    <div className={`form-group ${(errors[name]) ? "is-invalid" : ""} `}>
      <input
        type={type}
        className={`form-control focus-blue-bottom-border rounded p-2 mb-3 ${(errors[name]) ? "is-invalid text-danger" : ""}  `}
        placeholder={placeholder}
        {...register} // Pass the name to register
      />
       {errors[name] && <p className="invalid-feedback">{errors[name].message}</p>}
     </div>
  );
  
};

export default Input;
