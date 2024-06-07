import * as Yup from 'yup';

export const ProjectSchema = Yup.object().shape({
    portfolio : Yup.string().required('Select a Portfolio'),
    product : Yup.string().required('Select a Product'),
    name : Yup.string().required('Project name is required'),
    description : Yup.string().required('Project description is required'),
    startDate : Yup.date().required('Start date is required'),
    endDate : Yup.date().required('End date is required'),
    budget : Yup.number().required('Budget is required'),
    members : Yup.array().required('Project Team required'),
    model : Yup.string().required('Project Framework is required'),

})