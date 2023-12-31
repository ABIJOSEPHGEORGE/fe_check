import React, {useState, useContext} from 'react'
import {  useFormContext } from 'react-hook-form';
import UserStore from '../../../../contexts/UserStore';

const BioSection = () => {
    const [bioLength, setBioLength] = useState(0);
    const { register } = useFormContext()
    const { errors } = useContext(UserStore);

  return (
    <>
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex flex-col gap-3">
                <span className="flex items-center justify-between">
                    <label htmlFor="short_bio" className='text-md font-medium text-gray-700'>Short bio</label>
                    <p className='text-gray-300'>{`${bioLength} / 30`}</p>
                </span>
                <input type='text'  name='short_bio' maxLength={30} {...register('short_bio')} onChange={(e)=>setBioLength(e.target.value.length)} className='w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
                {errors?.short_bio && <span className='text-red-400'>{errors?.short_bio}</span>}
            </div>
            <div className="w-full flex flex-col gap-3">
                <label htmlFor="detailed_bio" className='text-md font-medium text-gray-700'>Detailed bio</label>
                <textarea  name='detailed_bio' {...register('detailed_bio')} className='w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
                {errors?.detailed_bio && <span className='text-red-400'>{errors?.detailed_bio}</span>}
            </div>
        </div>
    </>
  )
}

export default BioSection