import  { useState } from "react";
import { Form } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

const RangeInput = ({ register, name, setValue,getValues }) => {
  const [value, setVal] = useState(25);
setValue(name, value)
  const handleChange = (event, data) => {
    setVal(data);
    setValue(name, data);
   };

  return (
    <Form.Group controlId={name} className="w-50">
      <RangeSlider
        value={getValues(name)}
        onChange={handleChange}
        tooltipLabel={(currentValue) => `${currentValue}%`}
        tooltip="auto"
        variant="info"
        min={0}
        max={100}
        step={25}

        />
    </Form.Group>
  );
};

export default RangeInput;
