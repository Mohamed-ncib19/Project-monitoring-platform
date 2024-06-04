import React from 'react';
import clsx from 'clsx';
import Form from 'react-bootstrap/Form';

const TextareaInput = ({
  name,
  placeholder,
  readOnly = false,
  errors,
  register,
  defaultValue,
  rows = 10,  
  cols = 30   
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{placeholder}</Form.Label>
      <Form.Control 
        as="textarea" 
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        cols={cols}
        className={clsx('form-control focus-blue-bottom-border rounded z-0', {
          'is-invalid':!readOnly && errors[name]
        })}
        {...(readOnly? {} : register(name))}
        defaultValue={defaultValue}
      />
      {!readOnly && errors[name] && (
        <Form.Text className="text-danger">
          {errors[name].message}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default TextareaInput;
