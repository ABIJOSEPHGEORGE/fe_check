import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { intiatePayment } from '../../../../apis/wallet';
import { paymentAmountOptions } from '../../../../shared/constants';
import { PaymentSchema } from '../../../../utils/validations/payment';
import RenderRazorpay from './RenderRazorpay';


const PaymentForm = ({ setRecharge, transactionInfo }) => {
    const { register, handleSubmit} = useForm();
    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({});
    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        orderId: null,
        currency: null,
        amount: null,
    });

   const triggerPayment = useCallback(async (values) => {
        const data = await intiatePayment(values);
        if(data && data.id) {
            setOrderDetails({
                orderId: data.id,
                currency: data.currency,
                amount: data.amount,
            })
            setDisplayRazorpay(true);
        }
   },[]);

    const onSubmit = async data => {
        try{
            data.amount = amount;
            await PaymentSchema.validate(data, {abortEarly:false});
            await triggerPayment(data);
        }catch(error){
            setErrors({[error.inner[0].path]: error.inner[0].message});
        }
    }

    return (
        <div className="w-full lg:w-2/4 bg-white h-full p-4 flex flex-col justify-center">
            <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Full name</label>
                        <input type="text" className='p-2 border-2 border-gray-300 rounded-lg' name="name" {...register("name")}/>
                        { errors?.name && <span className='text-red-500'>{errors?.name}</span>}
                    </div>
                    <div className="w-full flex gap-3 flex-wrap">
                        <div className="flex flex-col flex-1 gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='p-2 border-2 border-gray-300 rounded-lg' name="email" {...register('email')} />
                            { errors?.email && <span className='text-red-500'>{errors?.email}</span>}
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <label htmlFor="phone">Phone</label>
                            <input type="phone" className='p-2 border-2 border-gray-300 rounded-lg' name="phone" {...register('phone')} />
                            { errors?.phone && <span className='text-red-500'>{errors?.phone}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="amount">Choose amount</label>
                        <div className="flex gap-2 items-center flex-wrap">
                            {
                                paymentAmountOptions.map((amt, index) => (
                                    <div key={index} className={`w-fit h-fit px-4 py-2 border-2 border-gray-100 cursor-pointer ${amount === amt && 'bg-green-500 text-white'}`} onClick={()=>setAmount(amt)}>
                                        <p className='text-center font-semibold'>{amt}</p>
                                        
                                    </div>
                                ))
                            }
                            { errors?.amount && <span className='text-red-500'>{errors?.amount}</span>}
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <button className='border-2 border-gray-200 text-center px-4 py-2 text-lg' type='button' onClick={() => setRecharge(false)}>Cancel</button>
                        <button className='bg-brandRed bg-opacity-85 text-white text-center px-4 py-3 rounded-md'>Proceed to pay</button>
                    </div>
            </form>
            {displayRazorpay && (
                <RenderRazorpay
                    amount={orderDetails.amount}
                    currency={orderDetails.currency}
                    orderId={orderDetails.orderId}
                    keyId={process.env.REACT_APP_RAZORPAY_KEY_ID}
                    transactionInfo = {transactionInfo}
                />
              )}
        </div>
    )
};


export default PaymentForm;