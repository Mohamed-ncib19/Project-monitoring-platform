import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required('LDAP username is required'),
  password: Yup.string().required('LDAP Password is required'),
});

const nameRegex = /^[A-Za-z]+$/;

export const RegisterSchema = Yup.object().shape({
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
});
