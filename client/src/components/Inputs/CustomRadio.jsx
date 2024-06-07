import Image from "next/image";

const CustomRadio = ({
    name,
    label,
    description,
    imageSrc,
    value,
    register,
    errors,
    onChange,
    readOnly
  }) => {
    return (
      <>
        <label
          htmlFor={value}
          className="border p-2 rounded checkbox-label d-flex flex-column justify-content-center align-items-center"
        >
          <Image src={imageSrc} draggable={false} />
          <input
            type="radio"
            id={value}
            name={name}
            className="custom-radio visually-hidden"
            {...register(name)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="ml-2 fw-bold">{label}</span>
          <span className="text-muted">{description}</span>
        </label>
      </>
    );
  };
  
  export default CustomRadio;
