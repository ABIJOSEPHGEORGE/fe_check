import React, { useCallback, useEffect, useState } from 'react';
import Dashboard from '../Dashboard';
import UpgradeCard from '../../../components/V3/UpgradeCard';
import UserCard from '../../../components/V3/UserCard';
import LoadingMatches from '../Matches/Loading';
import { shortlistedUsers } from '../../../apis/shortlisted';
import { FaRegCalendar } from "react-icons/fa6";
import { TiEye } from "react-icons/ti";
import ProfilePreview from '../ProfilePreview';

const Shortlisted = () => {
    const [loading, setLoading] = useState(false);
    const [shortlisted, setShortlisted] = useState([]);
    const [userProfile, setUserProfile] = useState(false);
    const [userId, setUserId] = useState('');

    const fetchShortlisted = useCallback(async () => {
        setLoading(true);
        const res = await shortlistedUsers();
        //handle pagination
        setShortlisted(res?.data[0]?.members ?? []);

        setLoading(false);
    },[]);

    useEffect(() => {
        fetchShortlisted();
    },[]);

    const userProfilePreview = (id) => {
        setUserProfile(true);
        setUserId(id)
    }

    const buttons = [
        { name: 'Meet', action: '', icon: FaRegCalendar},
        { name: 'View Profile', action: userProfilePreview, icon: TiEye},
    ];


    return (
        <Dashboard>
            <>
            {
                loading ?
                <div className='w-full h-full flex gap-16 justify-center lg:justify-start items-between mt-5 flex-wrap'>
                    <LoadingMatches title={'Fetching your shortlisted connections'}/>
                </div>
                : userProfile && userId ?
                    <ProfilePreview userId={userId} />
                :
                <div className='w-full h-full flex gap-16 justify-center lg:justify-start items-between mt-5 flex-wrap'>
                    {
                        shortlisted?.map((member, index) => (
                            <UserCard key={index} type='shortlisted' data={member} buttons={buttons} blockAfterAction={fetchShortlisted}/>
                        ))
                    }
                    <UpgradeCard/>
                </div>
            }
            
            </>
        </Dashboard>
    )
};

export default Shortlisted;