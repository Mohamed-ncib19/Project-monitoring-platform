import * as Yup from 'yup';

export const EditProjectSchema = Yup.object().shape({
    name: Yup.string().required('Product Name is required'),
    product: Yup.string().required('Product is required'),
    budget: Yup.number().required('Product Budget is required').typeError('The budget field requires numbers only. Please adjust your input'),
    currency : Yup.string(),
    members: Yup.array().required('Project members are required'),
    description: Yup.string()
});