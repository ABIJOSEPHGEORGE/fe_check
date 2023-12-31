import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import UserStore from '../../../contexts/UserStore';

const InputGroup = ({ type, name,label, disabled }) => {
    const { register } = useFormContext();
    const { errors } = useContext(UserStore);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="full_name" className='text-md font-medium text-gray-700'>{label}</label>
            <input type={type} disabled={disabled ?? false}  name={name} {...register(name)} className='w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
             {errors?.[name] && <span className='text-red-400'>{errors?.[name]}</span>}
        </div>
    )
};

export default InputGroup;