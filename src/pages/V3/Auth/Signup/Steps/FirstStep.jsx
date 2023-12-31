import React, { useContext } from 'react'
import maleActive from '../.././../../../assets/images/Signup/male_active.svg';
import maleInactive from '../.././../../../assets/images/Signup/male_inactive.svg';
import femaleActive from '../.././../../../assets/images/Signup/female_active.svg';
import femaleInactive from '../.././../../../assets/images/Signup/female_inactive.svg';
import { useFormContext } from 'react-hook-form';
import UserStore from '../../../../../contexts/UserStore';


const FirstStep = ({ gender, setGender }) => {
    const { register } = useFormContext();
    const { errors } = useContext(UserStore);
  return (
    <div className="w-full h-full flex flex-col items-start gap-5 md:w-3/4 md:gap-3" >
        <div className="w-full flex flex-col gap-3">
            <label htmlFor="full_name" className='text-lg font-medium'>Full Name</label>
            <input type='text'  name='full_name' {...register('full_name')} className='w-full px-6 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
            {errors?.full_name && <span className='text-red-400'>{errors?.full_name}</span>}
        </div>
        <div className="space-y-3">
            <label htmlFor="gender" className='text-lg font-medium'>Gender</label>
            <div className="flex gap-3 items-center justify-between">
                <div className="w-full flex items-center gap-2 cursor-pointer"  onClick={() => setGender('male')}>
                    <img src={gender === 'male' ? maleActive : maleInactive} alt="male" />
                    <p className='font-medium text-lg'>Male</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setGender('female')}>
                    <img src={gender === 'female' ? femaleActive : femaleInactive} alt="female" />
                    <p className='font-medium text-lg'>Female</p>
                </div>
            </div>
        </div>
        <div className="space-y-3 w-full">
            <label htmlFor="dob" className='text-lg font-medium'>Date of Birth</label>
            <input type='date' name='dob' {...register("dob")} className='w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
            {errors?.dob && <span className='text-red-400'>{errors?.dob}</span>}
        </div>
    </div>
  )
}

export default FirstStep