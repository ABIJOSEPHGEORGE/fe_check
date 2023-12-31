import * as Yup from "yup";
import { RELATIONSHIP_STATUS } from "../../shared/constants";

export const firstStepValidation = Yup.object({
    full_name: Yup.string().trim().required("Full Name is required"),
    gender: Yup.string()
        .trim("Gender is required")
        .oneOf(["male", "female"], "Gender is not valid")
        .required("Gender is required"),
    dob: Yup.string().trim().required("Date of Birth is required"),
});

export const secondStepValidation = Yup.object().shape({
    relationship_status: Yup.string().trim().oneOf(RELATIONSHIP_STATUS, 'Please select a valid relationship status').required("Relationship status is required"),
    file: Yup.mixed().required("Profile picture is required"),
});

export const thirdStepValidation = Yup.object().shape({
    phone: Yup.number()
        .min(10, "Phone number should include minimum 10 digits")
        .test('is-number', 'Please enter valid phone number', (value) => !isNaN(value))
        .typeError('Please enter a valid phone number')
        .required("Phone number is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    otp: Yup.number().required('Please verify your email').test('is-number', 'OTP must be a number', (value) => !isNaN(value))
    .typeError('Verify your email with a valid otp'),
    ref_code: Yup.string().trim().optional(),
});
