import * as Yup from 'yup';

export const Step1Schema = Yup.object().shape({
  portfolio: Yup.string().required('Portfolio is required'),
  product: Yup.string().required('Product is required'),
  name: Yup.string().required('Product Name is required'),
  code: Yup.string(),
  budget: Yup.number().required('Product Budget is required').typeError('The budget field requires numbers only. Please adjust your input'),
  currency: Yup.string().required('Budget Currency is required'),
  startDate: Yup.date().required('Product Start date is required')
    .typeError('Product start date requires Date Type only'),
  endDate: Yup.date().required('Product End date is required')
    .typeError('Product End date requires Date Type only'),
    days: Yup.number(),
    description: Yup.string(),
});

export const Step2Schema = Yup.object().shape({
    members: Yup.array().required('Project members are required'),
});

export const Step3Schema = Yup.object().shape({
  model: Yup.string().required('Project model is required'),
});

export const ProjectSchema = {
  Step1Schema,
  Step2Schema,
  Step3Schema,
};
