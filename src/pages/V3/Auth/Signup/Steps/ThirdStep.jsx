import React, {useContext, useState} from 'react';
import { useFormContext } from 'react-hook-form';
import { sendEmailOtp } from '../../../../../apis/auth';
import { toast } from 'react-toastify';
import UserStore from '../../../../../contexts/UserStore';


const ThirdStep = () => {
  const { register, setValue } = useFormContext();
  const { errors, setErrors } = useContext(UserStore); 

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleEmailChange = (e) => {
    setIsSent(false);
    setErrors({});
    const isValidEmail = /\S+@\S+\.\S+/.test(e.target.value);
    setIsValidEmail(isValidEmail);
    setEmail(e.target.value);
    setValue('email',e.target.value);
  };

  const handleVerifyEmail = async () => {
      setIsLoading(true);
      setIsSent(false);
      const res = await sendEmailOtp({email,type:'signup'});
      setIsLoading(false);
      if(res?.message){
        setIsSent(true);
        toast.success(res?.message);
      }else{
        setIsSent(false);
        setIsValidEmail(false);
        setErrors({email:'Please enter a valid email'});
      }
  }

  return (
    <div className="w-full h-full flex flex-col items-start gap-5 md:w-3/4 md:gap-3">
      <div className="w-full flex flex-col gap-3">
            <label htmlFor="phone" className='text-lg font-medium'>Phone</label>
            <input type='number'  name='phone' {...register("phone")} className='w-full px-6 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
            {errors?.phone && <span className='text-red-400'>{errors?.phone}</span> }
      </div>
      <div className="w-full flex flex-col gap-3">
      <label htmlFor="email" className='text-lg font-medium'>Email</label>
      <div className="relative">
        <input
          type='email'
          value={email}
          name='email'
          onChange={handleEmailChange}
          className={`w-full px-6 py-3 border-2 border-gray-300 rounded-xl  focus:outline-none ${isValidEmail ? 'border-green-500' : 'focus:border-blue-500'}`}
        />
        {isValidEmail && (
          <span className={`absolute top-1/2 transform -translate-y-1/2 py-2 px-2 flex items-center bg-white right-3 ${!isLoading && isSent ? 'text-green-500' : 'text-red-500'} cursor-pointer font-semibold`} onClick={handleVerifyEmail}>
              {
                 isLoading ? 'Sending OTP' : !isLoading && isSent ? 'resend OTP' : 'Verify'
              }
          </span>
        )}

      </div>
      {errors?.email && <span className='text-red-400'>{errors?.email}</span>}
      {!isSent && errors?.otp && <span className='text-red-400'>{errors?.otp}</span> }
    </div>
   {
    !isLoading && isSent &&
    <div className="w-full flex flex-col gap-3">
      <label htmlFor="otp" className='text-lg font-medium'>Verification Code</label>
      <input type='number'  name='otp' {...register("otp")} maxLength={'6'} className='w-full px-6 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
      {errors?.otp && <span className='text-red-400'>{errors?.otp}</span> }
    </div>
   }
   <div className="w-full flex flex-col gap-3">
      <label htmlFor="ref_code" className='text-lg font-medium'>Referral code</label>
      <input type='text'  name='ref_code' {...register("ref_code")}  className='w-full px-6 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
      {errors?.ref_code && <span className='text-red-400'>{errors?.ref_code}</span> }
    </div>
      
    </div>
  )
}

export default ThirdStep