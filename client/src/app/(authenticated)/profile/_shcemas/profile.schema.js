import * as Yup from 'yup';

export const EditUserSchema = Yup.object().shape({
    bio: Yup.string(),
    firstname: Yup.string(),
    lastname: Yup.string(),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone number is not valid'),
  });