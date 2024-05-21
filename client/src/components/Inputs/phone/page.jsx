import "./phone-input.styles.css";

const PhoneInput = ({register,errors,isValid,placeholder}) => {
    // input ${(errors.email || !isValid)? "is-invalid text-danger" : ""}
    //div ${(errors.email || !isValid) ? "is-invalid" : ""}
    return ( 
        <div className={`form-group `}>
        <input 
            type="number" 
            className={`form-control focus-blue-bottom-border rounded p-2 mb-3 `}  
            placeholder={placeholder}
            {...register}
            />
      {/* {errors.email && <p className="invalid-feedback">{errors.email.message}</p>} */}

        </div>
    );
};

export default PhoneInput;
