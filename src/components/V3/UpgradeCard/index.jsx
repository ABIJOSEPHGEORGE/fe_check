import React from 'react';
import upgrade_icon from '../../../assets/icons/upgrade_icon.svg';

const UpgradeCard = () => {
    return (
        <div className="bg-white max-w-[376.33px] w-64 rounded-xl flex justify-between items-center flex-col gap-5 px-3 py-5 min-h-fit shadow-gray-500 shadow-2xl ">
            <img src={upgrade_icon} alt="upgrade" className='w-full h-full' />
            <p className='text-gray-700 text-sm font-normal text-center'>Make your life easier by upgrading now to one of our tailored plans</p>
            <div className="flex justify-center">
                <button className='uppercase bg-brandRed text-white text-center  font-bold text-lg px-6 py-3 rounded-full shadow-gray-500 shadow-2xl'>Upgrade now</button>
            </div>
        </div>
    )
};

export default UpgradeCard;