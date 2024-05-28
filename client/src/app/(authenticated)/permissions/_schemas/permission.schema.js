import * as Yup from 'yup';


const nameRegex = /^[A-Za-z]+$/;

export const SetupSchema = Yup.object().shape({
    firstname: Yup.string()
    .matches(nameRegex, 'First name must contain only letters')
    .required('First name is required'),
  lastname: Yup.string()
    .matches(nameRegex, 'Last name must contain only letters')
    .required('Last name is required'),
  phoneNumber: Yup.string()
    .min(8, 'phone number must have 8 digits ')
    .matches(/^\d+$/, 'Phone number must contain only numeric characters')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
    position: Yup.string()
    .required('Buisness Position is required')
    ,
    salary: Yup.number()
      .typeError('Salary must be a number')
      .positive('Salary must be a positive number'),
    role: Yup.string(),
  });

  export const EditSchema = Yup.object().shape({
    firstname: Yup.string()
    .matches(nameRegex, 'First name must contain only letters')
    .required('First name is required'),
  lastname: Yup.string()
    .matches(nameRegex, 'Last name must contain only letters')
    .required('Last name is required'),
  phoneNumber: Yup.string()
    .min(8, 'phone number must have 8 digits ')
    .matches(/^\d+$/, 'Phone number must contain only numeric characters')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
    position: Yup.string()
    .required('Buisness Position is required')
    ,
    salary: Yup.number()
      .typeError('Salary must be a number')
      .positive('Salary must be a positive number'),
    role: Yup.string(),
  });