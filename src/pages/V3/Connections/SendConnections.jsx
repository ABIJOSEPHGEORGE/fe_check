import React, { useEffect, useState } from 'react';
import { fetchConnections } from '../../../apis/connections';
import LoadingMatches from '../Matches/Loading';
import UpgradeCard from '../../../components/V3/UpgradeCard';
import UserCard from '../../../components/V3/UserCard';
import { FaRegCalendar } from "react-icons/fa6";
import { TiEye } from "react-icons/ti";

const SendConnections = () => {
    const [connectionsSend, setConnectionsSend] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendConnections = async () => {
        setLoading(true);
        const connectionType = 'sent';
        const res = await fetchConnections({connectionType});
        //handle pagination res.pagination
        setConnectionsSend(res?.data[0]?.members);
        setLoading(false);
    };

    useEffect(() => {
        sendConnections();
    },[]);

    const buttons = [
        { name: 'Meet', action: '', icon: FaRegCalendar},
        { name: 'View Profile', action: '', icon: TiEye},
    ];

    return (
        <>
            {
                loading ?
                <div className='w-full h-full flex gap-16 justify-center lg:justify-start items-between mt-5 flex-wrap'>
                    <LoadingMatches title={'Fetching your send connections'}/>
                </div>
                :
                <div className='w-full h-full flex gap-16 justify-center lg:justify-start items-between mt-5 flex-wrap'>
                    {
                        connectionsSend?.map((member, index) => (
                            <UserCard key={index} type='connection' data={member} buttons={buttons} blockAfterAction={sendConnections}/>
                        ))
                    }
                    <UpgradeCard/>
                </div>
            }
        </>
    )
};

export default SendConnections;