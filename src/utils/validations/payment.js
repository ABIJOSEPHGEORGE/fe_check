import * as Yup from "yup";
import { paymentAmountOptions } from "../../shared/constants";

export const PaymentSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.number().required('Phone number is required'),
    amount: Yup.number().oneOf(paymentAmountOptions, 'Please select a valid amount to recharge').required('Amount is required'),  
});
