import * as Yup from 'yup';

export const ProductSchema = Yup.object().shape({
    portfolio: Yup.string().required('Portfolio is required'),
    name: Yup.string().required('Product Name is required'),
    code: Yup.string(),
    budget: Yup.number().required('Product Budget is required').typeError('The budget field requires numbers only. Please adjust your input'),
    currency: Yup.string().required('Budget Currency is required'),
    startDate: Yup.date().required('Product Start date is required')
    .typeError('Product start date requires Date Type only'),
    endDate: Yup.date().required('Product End date is required')
    .typeError('Product End date requires Date Type only'),
    teamlead: Yup.string()/* .required('Ensure you’ve selected a Product Team Lead.') */,
    description: Yup.string()
  });