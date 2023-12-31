import React,{ useContext } from 'react';
import UserStore from '../../../contexts/UserStore';

const ControlledSelect = ({ name, label, value, onChange, children, disabled= false }) => {
    const { errors } = useContext(UserStore);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className='text-md font-medium text-gray-700'>{label}</label>
            <select  name={name} disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} className='w-full capitalize px-4 py-2 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'>
                   { children }
            </select>
            {errors?.[name] && <span className='text-red-400'>{errors?.[name]}</span>}
        </div>
    )
};

export default ControlledSelect;