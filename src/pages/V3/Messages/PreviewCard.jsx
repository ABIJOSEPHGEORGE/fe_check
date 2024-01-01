import React from 'react';
import verified_badge from '../../../assets/icons/verified_badge.svg';
import { IoCheckmarkDone } from "react-icons/io5";
import ConvertTime from './ConvertTime';

const PreviewCard = ({data, setActiveRoomId, lastMessage, onlineUsers, currentUser}) => {
    const user = data;
    const setRoomId = () => {
     
        setActiveRoomId(user?.roomId);
    }

    return (
        <div className="w-full flex gap-3 items-center py-2 border-b-2 border-gray-300 cursor-pointer" onClick={setRoomId}>
            <div className="flex">
                <div className=" w-14 h-14 rounded-full">
                <div className="relative">
                    <img className="w-12 h-12 rounded-full" src={user?.photo} alt={user?.name || 'user'}/>
                    <span className={`top-9 left-7 absolute  w-3.5 h-3.5 bg-green-400 ${onlineUsers?.includes(user?._id) ? 'bg-green-400': 'bg-red-400'} border-2 border-white dark:border-gray-800 rounded-full`}></span>
                </div>
                </div>
            </div>
            
            <div className="w-full flex flex-col justify-center gap-1">
                <div className="w-full flex flex-col">
                    <h2 className='flex gap-2 text-md font-medium'>{user?.name}<span>{user?.verification?.status === 'verified' && <img src={verified_badge} alt='verified'/>}</span></h2>
                    
                </div>
                <div className="flex items-start gap-2">
                    {lastMessage?.sender_id?.toString() === currentUser?.toString() && <IoCheckmarkDone size={20} className={`${lastMessage?.read ? 'text-light-blue-600' : 'text-gray-500'}`}/>}
                    <p className='flex flex-wrap text-xs text-gray-700'>{lastMessage?.message || 'Start your conversion'}</p>
                </div>
                <p className='text-xs text-end text-gray-500'>{lastMessage?.message ? ConvertTime(lastMessage?.createdAt) : ''}</p>
            </div>
        </div>
    )
};

export default PreviewCard;