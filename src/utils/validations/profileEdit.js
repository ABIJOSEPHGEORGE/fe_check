import  * as Yup from 'yup';

export const editProfileValidation = Yup.object({
    full_name: Yup.string().trim().required('Full name is required'),
    dob: Yup.string().trim().required("Date of birth is required"),
    email: Yup.string().email().required("Email is required"),
    height: Yup.number().min(15,'Please select a valid height').required('Height is required'),
    weight: Yup.number().min(15, 'Please select a valid weight').required('Weight is required'),
    relationship_status: Yup.string().required('Relationship status is required'),
    country: Yup.string().notOneOf(['none'],'Please select a country').required('Country is required'),
    state: Yup.string().notOneOf(['none', 'Please select a valid state']).required('State is required'),
    city: Yup.string().notOneOf(['none', 'Please select a valid city']).required('City is required'),
    marriage_timeline: Yup.string().required('Please select a valid marriage timeline'),
    handpicked: Yup.boolean().optional(),
    short_bio: Yup.string().required('Short bio is required'),
    detailed_bio: Yup.string().required('Detailed bio is required'),
    highest_qualification: Yup.string().notOneOf(['Select'],'Please select your highest qualification').required('Highest qualification is required'),
    university_or_institute: Yup.string().required('University / Institute is required'),
    occupation: Yup.string().notOneOf(['Select'],'Please select your occupation').required('Occupation is required'),
    company_name: Yup.string().required('Company name is required'),
    religion: Yup.string().notOneOf(['Select','none'],'Religion is required').required('Religion is required'),
    caste: Yup.string().optional(),
    how_often_pray: Yup.string().required('How often do you pray is required'), 
    lifestyle_choices: Yup.object({
        diet: Yup.string().required('Please select your dietary choices'),
        drinking: Yup.string().required('Please select your drinking choices'),
        smoking: Yup.string().required('Please select your smoking choices'),
        workout: Yup.string().required('Please select your workout choices')
    }),
    interests_and_hobbies: Yup.array().min(1, 'Please select at least one interest or hobby'),
    personality_traits: Yup.array().min(1, 'Please select at least one personality trait'),
    contact_preferences: Yup.array().min(1, 'Please select your contact preferences'),
});

