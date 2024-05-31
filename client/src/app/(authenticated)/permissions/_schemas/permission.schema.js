import * as Yup from 'yup';


const nameRegex = /^[A-Za-z]+$/;


export const SetupSchema = Yup.object().shape({
  firstname: Yup.string(),
  lastname: Yup.string(),
  phone: Yup.number().typeError('Phone must contain only numbers'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  businessPosition: Yup.string().required('Position is required'),
  salary: Yup.number().typeError('Salary must be a number')
    .required('Salary is required'),
  role: Yup.string().required('Role is required'),
});


export const EditSchema = Yup.object().shape({
  firstname: Yup.string(),
  lastname: Yup.string(),
  phone: Yup.number().typeError('Phone must contain only numbers'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  businessPosition: Yup.string().required('Position is required'),
  salary: Yup.number().typeError('Salary must be a number')
    .required('Salary is required'),
  role: Yup.string().required('Role is required'),
});