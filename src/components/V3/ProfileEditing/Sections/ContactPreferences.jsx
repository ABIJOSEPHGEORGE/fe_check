import React, { useContext } from 'react';
import UserStore from '../../../../contexts/UserStore';
import { ContactPreferencesOptions } from '../../../../pages/V3/EditUserDetails/EditProfile/contactPreferences';

const ContactPreferences = () => {
    const {  errors, editProfileValues, setEditProfileValues } = useContext(UserStore);
    const { contactPreferences } = editProfileValues;

    const handleContactPreferences = (item) => {
        setEditProfileValues((prev) =>{
            if(!prev.contactPreferences.includes(item)){
                return {...prev, contactPreferences: [...prev.contactPreferences, item]}
            }else{
                return {...prev, contactPreferences: prev.contactPreferences.filter((selectedItem) => selectedItem !== item)}
            }
        });
    }

  return (
    <>
    <div className="flex w-3/4 justify-between items-center">
        {
            ContactPreferencesOptions.map((item, index) => (
                
                    <div  key={index} className={`flex gap-1 justify-center px-2 w-fit rounded-full items-center cursor-pointer  ${contactPreferences.includes(item.value) && 'bg-brandRed text-white'}`}
                    onClick={()=>handleContactPreferences(item.value)}>
                        <item.icon size={40} className={`rounded-full p-2 shadow-gray-200 shdow-xl`}/>
                        <p className={`${contactPreferences.includes(item.value) ? 'text-white': 'text-gray-700'}`}>{item.name}</p>
                    </div>
            ))
        }
       
    </div>
    {errors?.contact_preferences && <span className='text-red-400'>{errors?.contact_preferences}</span>}
    </>
  )
}

export default ContactPreferences