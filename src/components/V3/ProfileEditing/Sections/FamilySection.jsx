import React from 'react'
import { FAMILY_BACKGROUND } from '../../../../shared/constants';
import { useFormContext } from 'react-hook-form';
import InputGroup from '../../Form/InputGroup';
import SelectGroup from '../../Form/SelectGroup';

const FamilySection = () => {
    const { register } = useFormContext()

  return (
    <>
        <div className="flex flex-col gap-3 w">
            <div className="flex flex-col gap-2">
                <label htmlFor="about_family" className='text-md font-medium text-gray-700'>About family</label>
                <textarea  name='about_family' {...register('about_family')} className='w-full px-4 py-1 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'></textarea>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col gap-2 md:flex-1">
                    <InputGroup name='father_name' type={'text'} label={'Father name'}/>
                </div>
                <div className="flex flex-col gap-2 md:flex-1">
                    <InputGroup name='mother_name' label={'Mother name'} type={'text'} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row  gap-2">
                <div className="flex flex-col gap-2 md:flex-1">
                    <InputGroup label={'Father occupation'} type={'text'}  name='father_occupation'/>
                </div>
                <div className="flex flex-col gap-2 md:flex-1">
                    <InputGroup  name='mother_occupation' label={'Mother occupation'} type={'text'}/>
                </div>
            </div>
            <div className="flex flex-col  gap-2">
                <div className="flex flex-col gap-2">
                    <SelectGroup name={'family_background'} label={'Family background'} valueArray={FAMILY_BACKGROUND}/>
                </div>
                <div className="flex flex-col gap-2 md:flex-1">
                    <InputGroup label={'Family Location'} type={'text'} name={'family_location'} />
                </div>
            </div>
        </div>
    </>
  )
}

export default FamilySection