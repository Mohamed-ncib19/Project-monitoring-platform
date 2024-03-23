import "./select-input.styles.css";
const SelectInput = ({register, errors,content,name,placeholder}) => {
  return (
    <div className="mb-3 form-group">
      <select
        className={`form-select tomselected ts-hidden-accessible focus-blue-bottom-border rounded p-2 ${errors[name] ? "is-invalid" : ""} `}
        id="select-users"
        tabIndex="1"
        {...register}
      >
        <option selected disabled>{placeholder}</option>
        {content.map((position, index) => (
          <option key={index} value={position.value}>{position.text}</option>
        ))}
      </select>
      {errors[name] && <p className="invalid-feedback">{errors[name].message}</p>} 

    </div>
  );
};

export default SelectInput;
