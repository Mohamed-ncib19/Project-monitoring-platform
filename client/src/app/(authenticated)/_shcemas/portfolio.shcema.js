import * as Yup from 'yup';

export const PortfolioShcema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    manager: Yup.string(),
    description: Yup.string(),
})