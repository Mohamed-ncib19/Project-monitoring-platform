import "./email-input.styles.css";

const EmailInput = ({register,errors,isValid}) => {
    return ( 
        <div className={`form-group ${(errors.email || !isValid) ? "is-invalid" : ""}`}>
        <input 
            type="email" 
            className={`form-control focus-blue-bottom-border rounded p-2 mb-3 ${(errors.email || !isValid)? "is-invalid text-danger" : ""} `}  
            placeholder='LDAP Username or Email'
            name='email'
            {...register}
            />
      {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}

        </div>
    );
};

export default EmailInput;
