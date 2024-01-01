import React, { useEffect, useState } from 'react';
import { acceptConnection, fetchConnections, rejectConnection } from '../../../apis/connections';
import { IoClose } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa6';
import LoadingMatches from '../Matches/Loading';
import UpgradeCard from '../../../components/V3/UpgradeCard';
import UserCard from '../../../components/V3/UserCard';
import {updateEndUserBalance} from '../../../socket/SocketManager';

const ReceivedConnections = () => {
    const [connectionsReceived, setConnectionsReceived] = useState([]);
    const [loading, setLoading] = useState(false);

    const receivedConnections = async ()=>{
        setLoading(true);
        const connectionType = 'received';
        const res = await fetchConnections({connectionType});
        //handle pagination with res.pagination
        setConnectionsReceived(res?.data[0]?.members ?? []);
        setLoading(false);
    }

    useEffect(() => {
        receivedConnections();
    },[]);

    const handleReject = async(requested_user) => {
        await rejectConnection(requested_user);
        receivedConnections();
    };

    const handleAccept = async(requested_user) => {
        const res = await acceptConnection(requested_user);
        if(res){
            updateEndUserBalance(res?.requested_user);
        }
        receivedConnections();
    };

    const buttons = [
        {name: 'Reject', action: handleReject, icon: IoClose},
        {name: 'Accept', action: handleAccept, icon: FaHeart},
    ];

    return(
        <>
            {
                loading ?
                    <div className='w-full h-full flex gap-16 justify-center lg:justify-start items-between mt-5 flex-wrap'>
                        <LoadingMatches title={'Fetching your received connections'}/>
                    </div>
                :
                <div className='w-full h-full flex gap-16 justify-center lg:justify-start items-between mt-5 flex-wrap'>
                    {
                        connectionsReceived?.map((member, index) => (
                            <UserCard key={index} type='connection_received' data={member} buttons={buttons} blockAfterAction={receivedConnections}/>
                        ))
                    }
                    <UpgradeCard/>
                </div>
            }
        </>
    )
};

export default ReceivedConnections;