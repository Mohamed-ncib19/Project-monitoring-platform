import "./read-only-text-input.styles.css";

const ReadOnlyInput = ({ placeholder, type,value,disabled }) => {



  return (
    <div
      className={`form-group form-floating mb-3 mb-2 w-100 z-0`}
    >
      <input
      disabled={disabled}
        type={type}
        className={`custom-readonly-input form-control focus-blue-bottom-border rounded`}
        id="floating-input"
        placeholder={placeholder}
        value={value ? value : ''}
      />
    </div>
  );
};

export default ReadOnlyInput;
