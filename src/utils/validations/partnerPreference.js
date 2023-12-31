import * as Yup from 'yup';

export const partnerPreferenceValidation = Yup.object().shape({
    age_from: Yup.string().required(),
    age_to: Yup.string().required(),
    highest_qualification: Yup.string().notOneOf(['Select'],'Please select Preferred educational qualification').required('Higest qualification is required'),
    occupation: Yup.string().notOneOf(['Select'], 'Please select an Occupation').required('Occupation is required'),
    family_background: Yup.string().notOneOf(['Select'], 'Please select a Family background').required('Family background is required'),
    preferred_religion: Yup.string().notOneOf(['Select'], 'Please select a Religion').required('Religion is required'),
    preferred_caste: Yup.string().optional(),
    marriage_timeline: Yup.string().notOneOf(['Select'], 'Please select a Marriage timeline').required('Marriage timeline is required'),
    no_preferred_religion: Yup.boolean().oneOf([true, false]),
    no_preferred_caste: Yup.boolean().oneOf([true, false]),
    diet: Yup.array().min(1,'Please select your dietary choices').required('Please select your dietary choices'),
    drinking: Yup.array().min(1,'Please select your drinking choices').required('Please select your drinking choices'),
    smoking: Yup.array().min(1,'Please select your smoking choices').required('Please select your smoking choices'),
    workout: Yup.array().min(1,'Please select your workout choices').required('Please select your workout choices'),
    personality_traits: Yup.array().min(1, 'Please select at least one personality trait'),
    relationship_status: Yup.array().min(1,'Please select your preferred relationship status').required(),
    height_from: Yup.number().required('Please selected your preferred height range'),
    height_to: Yup.number().required('Please select your preferred height range'),
})