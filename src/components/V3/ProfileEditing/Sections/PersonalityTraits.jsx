 import React,{useContext } from 'react';
 import UserStore from '../../../../contexts/UserStore';
import { PERSONALITY_TRAITS } from '../../../../shared/constants';
 
 const PersonalityTraits = () => {
    const { errors, editProfileValues, setEditProfileValues } = useContext(UserStore);
    const { personalityTraits } = editProfileValues;

    const handlePersonalityTraits = (item) => {
        setEditProfileValues((prev) =>{
            if(!prev.personalityTraits.includes(item)){
                return {...prev, personalityTraits: [...prev.personalityTraits, item]}
            }else{
                return {...prev, personalityTraits: prev.personalityTraits.filter((selectedItem) => selectedItem !== item)}
            }
        });
    };
    

   return (
    <>
    <div className="flex flex-wrap gap-2">
        {
            PERSONALITY_TRAITS.map((item, index) => (
                <span 
                key={index} 
                onClick={()=>handlePersonalityTraits(item)}
                className={`
                py-1 px-2 cursor-pointer rounded-full flex gap-2 items-center flex-wrap w-fit
                ${personalityTraits.includes(item) ? 'bg-brandRed text-white' : 'bg-gray-200'}
                `}>
                    <p className='text-md font-md '>{item}</p>
                    </span>
                ))
            }
            
        </div>
        {errors?.personality_traits && <span className='text-red-400'>{errors?.personality_traits}</span>}
    </>
   )
 }
 
 export default PersonalityTraits