import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-tailwind/react";
import cover_placeholder from '../../../assets/images/Dashboard/cover_placeholder.png';
import { getAge } from '../../../shared/dates';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import { fetchUserData } from '../../../apis/users';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProfilePreview = ({userId}) => {
    const [user, setuser] = useState({});
    const [loading, setLoading] = useState(false);

    const getUserDetails = async () => {
        setLoading(true);
        const res = await fetchUserData(userId);
        setuser(res);
        setLoading(false);
    };

    useEffect(() => {
        getUserDetails();
    },[userId])

    if(loading){
        return (
            <div className="bg-white shadow-md shadow-gray-200 rounded-xl flex flex-col relative h-full gap-2">
                <Skeleton count={5}/>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-md shadow-gray-200 rounded-xl flex flex-col relative h-full gap-2">
            <div className="w-full h-48 max-h-full ">
                <img src={cover_placeholder} alt="cover image" className='w-full h-full rounded-t-xl' />
            </div>
            <div className="w-full h-full px-4 flex absolute top-48">
                <Avatar
                    size="xxl"
                    alt="avatar"
                    src={user?.photo}
                    className="border w-44 h-44 border-white shadow-xl shadow-green-900/20 ring-4 ring-white -mt-24"
                />
                <div className="bg-brandRed -mt-10 h-20 -ml-10 min-w-48 max-w-fit  p-3 rounded-full pl-12 flex flex-col justify-center">
                    <div className="flex flex-col gap-0 px-2">
                        <h2 className='text-white text-lg font-bold'>{user?.name}</h2>
                        {user?.personal?.occupation && <p className='text-white text-sm'>{user?.personal?.occupation} - {user?.address?.city}</p>}
                        <p className='text-white text-sm'>{getAge(user?.personal?.dob)} Years old</p>
                    </div>
                </div>
            </div>
            <SectionOne user={user}/>
            <SectionTwo user={user}/>
            <SectionThree user={user}/>
        </div>
    )
};

export default ProfilePreview;