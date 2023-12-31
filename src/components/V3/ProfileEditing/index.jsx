import React from 'react';
import { IoIosArrowDown } from "react-icons/io";


const ProfileEditCard = ({toggleState, toggleName, dispatch, title, children}) => {
    
    return (
        <div className="w-full h-fit bg-white shadow-md shadow-gray-200 rounded-xl p-4 flex flex-col gap-3 " >
                <span className='w-full flex items-center gap-1 justify-between cursor-pointer' onClick={()=>dispatch({type: toggleName})}>
                    <div className="flex gap-2 items-center">
                        <h3 className='text-lg font-semibold text-brandRed'>{title}</h3>
                    </div>
                    <IoIosArrowDown size={20}/>
                </span>
                {
                    toggleState &&
                    <>
                        { children }
                    </>
                }
        </div>
    )
};

export default ProfileEditCard;