import Image from "next/image";
import { useEffect, useState } from "react";

const CustomRadio = ({
  name,
  label,
  description,
  imageSrc,
  value,
  register,
  onChange,
  readOnly,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (register(name).value === value) {
      setIsChecked(isChecked => !isChecked);
    }
  }, [register, name, value]);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onChange(e.target.value);
  };

  return (
    <label
      htmlFor={`${name}-${value}`}
      className={` border p-2 rounded checkbox-label d-flex flex-column justify-content-center align-items-center ${readOnly ? 'read-only' : ''} ${isChecked ? 'checked' : 'custom-radio-label'}`}
    >
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        className="custom-radio"
        {...register(name)}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
      />
      <Image src={imageSrc} draggable={false} alt={`${label} image`} />
      <span className="ml-2 fw-bold">{label}</span>
      <span className="text-muted">{description}</span>
    </label>
  );
};

export default CustomRadio;
