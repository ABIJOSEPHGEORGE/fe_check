import React from 'react';
import detailed_bio_icon from '../../../assets/icons/detailed_bio.svg';
import about_family_icon from '../../../assets/icons/about_family-icon.svg';
import father_name_icon from '../../../assets/icons/father_name.svg';
import mother_name_icon from '../../../assets/icons/mother_name.svg';
import father_occupation_icon from '../../../assets/icons/father_occupation.svg';
import mother_occupation_icon from '../../../assets/icons/mother_occupation.svg';
import family_background_icon from '../../../assets/icons/family_background.svg';


const SectionThree = ({ user }) => {
    return (
        <div className="flex flex-col gap-4 px-4 mt-5">
            {
                user?.personal?.detailed_bio &&
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <img src={detailed_bio_icon} alt="user detailed bio" className='w-8 h-8' />
                        <h3 className='text-lg text-gray-700'>{user?.name} Bio</h3>
                    </div>
                    <p className='text-md'>{user?.personal?.detailed_bio}</p>
                </div>
            }
            {
                user?.family?.about &&
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <img src={about_family_icon} alt="user detailed bio" className='w-8 h-8' />
                        <h3 className='text-lg text-gray-700'>About Family</h3>
                    </div>
                    <p className='text-md'>{user?.family?.about}</p>
                </div>
            }
            <div className="flex w-full justify-start gap-10 items-center">
                {
                    user?.family?.father?.name &&
                    <div className='flex flex-col flex-1 gap-2'>
                        <div className='flex gap-2'>
                            <img src={father_name_icon} alt="user detailed bio" className='w-8 h-8' />
                            <h3 className='text-lg text-gray-700'>Father Name</h3>
                        </div>
                        <p className='text-md'>{user?.family?.father?.name}</p>
                    </div>
                }
                {
                    user?.family?.mother?.name &&
                    <div className='flex flex-col flex-1 gap-2'>
                        <div className='flex gap-2'>
                            <img src={mother_name_icon} alt="user detailed bio" className='w-8 h-8' />
                            <h3 className='text-lg text-gray-700'>Mother Name</h3>
                        </div>
                        <p className='text-md'>{user?.family?.mother?.name}</p>
                    </div>
                }
            </div>
            <div className="flex w-full gap-10 justify-start items-center">
                {
                    user?.family?.father?.occupation &&
                    <div className='flex flex-col flex-1 gap-2'>
                        <div className='flex gap-2'>
                            <img src={father_occupation_icon} alt="user detailed bio" className='w-8 h-8' />
                            <h3 className='text-lg text-gray-700'>Father Occupation</h3>
                        </div>
                        <p className='text-md'>{user?.family?.father?.occupation}</p>
                    </div>
                }
                {
                    user?.family?.mother?.occupation &&
                    <div className='flex flex-col flex-1 gap-2'>
                        <div className='flex gap-2'>
                            <img src={mother_occupation_icon} alt="user detailed bio" className='w-8 h-8' />
                            <h3 className='text-lg text-gray-700'>Mother Occupation</h3>
                        </div>
                        <p className='text-md'>{user?.family?.mother?.occupation}</p>
                    </div>
                }
            </div>
            {
                user?.family?.family_background && user?.family?.family_background !== 'Select' &&
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <img src={family_background_icon} alt="user detailed bio" className='w-8 h-8' />
                        <h3 className='text-lg text-gray-700'>Family Background</h3>
                    </div>
                    <p className='text-md'>{user?.family?.family_background}</p>
                </div>
            }
        </div>
    )
};

export default SectionThree;