import React,{ useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import UserStore from '../../../contexts/UserStore';

const SelectGroup = ({ name, label, valueArray }) => {

    const { register } = useFormContext();
    const { errors } = useContext(UserStore);

    return (
         <div className="flex flex-col gap-2">
            <label htmlFor={name} className='text-md font-medium text-gray-700'>{label}</label>
            <select name={name} {...register(name)} className='w-full capitalize px-4 py-2 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'>
                    {
                        valueArray?.map((sts, index) => (
                            <option key={index} value={sts}>{sts}</option>
                        ))
                    }
            </select>
            {errors?.[name] && <span className='text-red-400'>{errors?.[name]}</span>}
         </div>
    )
};

export default SelectGroup;