import React,{useContext } from 'react'
import { INTERESTS_AND_HOBBIES } from '../../../../shared/constants';
import UserStore from '../../../../contexts/UserStore';

const InterestAndHobbies = () => {
    const {  errors, editProfileValues, setEditProfileValues } = useContext(UserStore);
    const { interests } = editProfileValues;

    const handleInterestSelection = (item) => {
        setEditProfileValues((prev) =>{
            if(!prev.interests.includes(item)){
                return {...prev, interests: [...prev.interests, item]}
            }else{
                return {...prev, interests: prev.interests.filter((selectedItem) => selectedItem !== item)}
            }
        });
    }

  return (
    <>
        <div className="flex flex-wrap gap-2">
            {
                INTERESTS_AND_HOBBIES.map((item, index) => (
                    <span 
                    key={index} 
                    onClick={()=>handleInterestSelection(item)}
                    className={`
                    py-1 px-2 cursor-pointer rounded-full flex gap-2 items-center flex-wrap w-fit
                    ${interests.includes(item) ? 'bg-brandRed text-white' : 'bg-gray-200'}
                    `}>
                        <p className='text-md font-md '>{item}</p>
                    </span>
                ))
            }
        </div>
        {errors?.interests_and_hobbies && <span className='text-red-400'>{errors?.interests_and_hobbies}</span>}
    </>
  )
}

export default InterestAndHobbies