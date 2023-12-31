import { State } from 'country-state-city';
import React, { useContext, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { MdBlock, MdOutlineReport } from "react-icons/md";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { blockUser, reportUser } from '../../../apis/users';
import verified_badge from '../../../assets/icons/verified_badge.svg';
import cover_placeholder from '../../../assets/images/Dashboard/cover_placeholder.png';
import UserStore from '../../../contexts/UserStore';
import { getAge } from '../../../shared/dates';

const UserCard = ({ type = 'preview', data, buttons, blockAfterAction}) => {

    const { user } = useContext(UserStore);

    const userData = type === 'preview' ? user : data;
    const previewButtons = [
        {name: 'Skip', action: '', icon: IoClose},
        {name: 'Edit', action: '', icon: FaHeart},
    ];



    const actionButtons = buttons ?? previewButtons;

    const userState = State.getStateByCodeAndCountry(userData?.address?.state_id, userData?.address?.country_id);

    const [selectedSlide, setSelectedSlide] = useState(0);

    const [kebabMenu, setKebabMenu] = useState(false);

    const handleDotClick = (index) => {
        // Handle dot click here, you can set the selected slide in state
        setSelectedSlide(index);
      };

    const handleBlockUser = async () => {
        await blockUser({blockedUser: userData?._id});
        blockAfterAction();
        setKebabMenu(false);
    };

    const handleReportUser = async () => {
        await reportUser({reportedId: userData?._id});
        setKebabMenu(false);
    };

    const renderCustomDots = (totalSlides) => {
        const dots = [];
        for (let i = 0; i < totalSlides; i++) {
          dots.push(
            <li
              key={i}
              onClick={() => handleDotClick(i)}
              style={{
                background: 'red', // Adjust colors
                width: 10,
                height: 10,
                borderRadius: '50%',
                display: 'inline-block',
                margin: '0 5px', // Adjust spacing between dots
                cursor: 'pointer',
                opacity: i === selectedSlide ? 1 : 0.5,
              }}
            />
          );
        }
        return dots;
      };
      
    return (
        <div className="bg-white max-w-[376.33px] w-64 rounded-xl flex flex-col gap-3 pb-3 shadow-gray-500 shadow-2xl min-h-fit ">
            <div className="h-28">
                <img src={cover_placeholder} alt="user_cover_image" className='w-full h-full rounded-t-xl' />
            </div>
            <div className="w-full flex justify-center relative">
                <div className="w-28 h-28 rounded-full border-4 border-white -mt-14">
                    <img src={userData?.photo} alt="profile image" className='w-full h-full object-cover rounded-full'/>
                </div>
                {
                    type !=='preview' &&
                    <div className="absolute -top-4 right-3 cursor-pointer" onClick={()=>setKebabMenu(!kebabMenu)}>
                        <GoKebabHorizontal size={25} color='gray'/>
                    </div>
                }
                {
                    kebabMenu &&
                    <div className="absolute top-0 right-3 bg-white rounded-lg p-1 shadow-2xl drop-shadow-2xl shadow-gray-300 z-40">
                        <button type='button' onClick={handleReportUser} className='flex gap-3 items-center px-4 py-2 text-md text-brandRed'>
                            <MdOutlineReport size={20}/>
                            Report user
                        </button>
                        <button type='button' onClick={handleBlockUser} className='flex gap-3 items-center px-4 py-2 text-md  text-brandRed'>
                            <MdBlock size={20}/>
                            Block user
                        </button>
                    </div>
                }
                
            </div>
           <div className='flex flex-col items-center'>
            <h2 className='font-semibold text-xl ps-4 flex gap-1 items-center'>{userData?.name}<span>{userData?.verification?.status === "verified" && <img src={verified_badge} alt="verified" />}</span></h2>
            <p className='text-center text-xs'>{userData?.address?.city}, {userState?.name}</p>
            <p className='text-center text-xs'>{userData?.address?.city}</p>
           </div>
            <div className="flex flex-col">
                <Carousel emulateTouch={true} showArrows={false} showThumbs={false} showIndicators={false} showStatus={false} selectedItem={selectedSlide} onChange={(index) => setSelectedSlide(index)}>
                    <div className="w-full gap-5 flex flex-col justify-center items-center">
                        <div className="flex w-full px-6 justify-center gap-5 items-center">
                            {
                                userData?.personal?.dob && 
                                <div className='flex flex-col items-center'>
                                    <h4 className='font-semibold text-md'>{userData?.age ? userData?.age : getAge(userData?.personal?.dob)}</h4>
                                    <p className='text-sm'>Age</p>
                                </div>
                            }
                            {
                                userData?.personal?.religion_id?.name &&
                                <div className='flex flex-col items-center'>
                                    <h4 className='font-semibold text-md capitalize'>{userData?.personal?.religion_id?.name.split('-').join(' ').toLowerCase()}</h4>
                                    <p className='text-sm'>Religion</p>
                                </div>
                            }
                            {
                                userData?.personal?.height &&
                                <div className='flex flex-col items-center'>
                                    <h4 className='font-semibold text-md'>{userData?.personal?.height}</h4>
                                    <p className='text-sm'>Height</p>
                                </div>
                            }
                            
                        </div>
                        <div className="flex justify-center items-center gap-5">
                            {
                                actionButtons.map((btn, index) => (
                                    <div key={index} className='flex justify-center items-center flex-col'>
                                        <button className={`rounded-full w-fit p-3 bg-brandRed text-white ${type === 'connection' && ' blur-sm'}`} type='button' onClick={()=>btn.action && btn.action(userData?._id)}>{<btn.icon size={20}/>}</button>
                                        <p className='text-gray-600 capitalize'>{btn.name}</p>
                                    </div>  
                                ))
                            }
                             
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-3">
                        {
                            userData?.personal?.short_bio &&
                            <p className='text-xs text-center w-3/4'>{userData?.personal?.short_bio}</p>
                        }
                        {
                            userData?.personal?.occupation &&
                            <div className='flex flex-col gap-1'>
                                <h3 className='font-semibold text-lg'>{userData?.personal?.occupation}</h3>
                                <p className='text-sm'>Profession</p>
                            </div>
                        }
                        
                    </div>
                </Carousel>
                <div className="flex justify-center">
                    <ul style={{ listStyle: 'none', padding: 0 }}>{renderCustomDots(userData?.personal?.short_bio || userData?.personal?.occupation ? 2 : 1)}</ul>
                </div>
            </div>
        </div>
    )
};

export default UserCard;