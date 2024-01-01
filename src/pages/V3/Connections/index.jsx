import React, { useContext } from 'react';
import Dashboard from '../Dashboard';
import UserStore from '../../../contexts/UserStore';
import SendConnections from './SendConnections';
import ReceivedConnections from './ReceivedConnections';


const Connections = () => {

    const { connectionTab, dispatchConnectionTab } = useContext(UserStore);

    const tabItems = [
        {
            name: 'Send Connections',
            actionName: 'SEND_CONNECTIONS',
            state: 'send_connections',
        },
        {
            name: 'Received Connections',
            actionName: 'RECEIVED_CONNECTIONS',
            state: 'received_connections',
        }
    ];

    return (
        <Dashboard tabItems={tabItems} tabEdit={connectionTab} tabDispatch={dispatchConnectionTab}>
            {
                connectionTab?.send_connections ?
                    <SendConnections/>
                : connectionTab?.received_connections ?
                    <ReceivedConnections/>
                : null
            }
        </Dashboard>
    )
};

export default Connections;