import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

const MultiSelect = ({ name, valueArray, label}) => {
    const { control } = useFormContext();
    return (
        <div className="flex flex-col gap-2">
        <label htmlFor={name} className='text-md font-medium text-gray-700'>{label}</label>
        <Controller
            name={name}
            control={control}
            render={({
                field: {  onChange, onBlur, value, name, ref },
            }) => (
                <Select
                    options={valueArray}
                    onChange={onChange}
                    isMulti={true}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    styles={{border: 'none'}}
                />
            )}
        />
        </div>
    )
};

export default MultiSelect;