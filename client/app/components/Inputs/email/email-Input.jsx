import "./email-input.styles.css";

const EmailInput = ({register,errors,isValid ,placeholder }) => {
    return ( 
        <div className={`form-group ${(errors.email || !isValid) ? "is-invalid" : ""}`}>
        <input 
            type="email" 
            className={`form-control focus-blue-bottom-border rounded p-2 mb-3 ${(errors.email || !isValid)? "is-invalid text-danger" : ""} `}  
            placeholder={placeholder}
            name='email'
            {...register}
            />
      {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}

        </div>
    );
};

export default EmailInput;
