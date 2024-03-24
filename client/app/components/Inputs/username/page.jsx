import "./username-input.styles.css";
const Username = ({ placeholder, register, errors,name}) => {
  return (
    <div className="input-group mb-3 ">
      <span className="input-group-text focus-blue-bottom-border">@</span>
      <input
        type="text"
        className={`form-control focus-blue-bottom-border rounded-end p-3  ${errors[name] ? "is-invalid" : ""}`} // Add "is-invalid" class based on errors
        placeholder={placeholder}
        {...register}
      />
            {errors[name] && <p className="invalid-feedback">{errors[name].message}</p>} {/* Display error message if there's an error */}

    </div>
  );
};

export default Username;
