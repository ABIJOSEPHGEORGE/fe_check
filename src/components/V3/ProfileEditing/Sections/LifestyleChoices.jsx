import React, { useContext } from 'react';
import UserStore from '../../../../contexts/UserStore';
import { LIFESTYLE_CHOICES } from '../../../../shared/constants';

const LifestyleChoices = () => {
    const { errors, editProfileValues, setEditProfileValues } = useContext(UserStore);
    const { lifestyleChoices } = editProfileValues;

  return (
    <>
        <div className="flex flex-col gap-5">
            {
                LIFESTYLE_CHOICES.map((item, index) => (
                    <div key={index} className="space-y-5">
                        <div className="space-y-3">
                            <h4 className='text-sm font-medium'>{item.title}</h4>
                            <div className="w-full flex gap-2 flex-wrap">
                                {
                                    item.values.map((choice, index) => (
                                        <span 
                                        key={index} 
                                        className={`
                                            py-1 px-2 cursor-pointer rounded-full flex gap-2 items-center
                                        ${ lifestyleChoices?.[item.key] === choice ? 'bg-brandRed text-white' : 'bg-gray-200' }
                                        `}
                                        onClick={() => setEditProfileValues((prev) => ({...prev, lifestyleChoices: {...prev.lifestyleChoices, [item.key]: choice}}))}>
                                            <p className='text-md font-md '>{choice}</p>
                                        </span>
                                    ))
                                }
                            </div>
                            {errors?.lifestyle_choices?.[item.key] && <span className='text-red-400'>{errors?.lifestyle_choices?.[item.key]}</span>}
                        </div>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default LifestyleChoices