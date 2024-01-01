import React, { useCallback, useContext, useEffect, useState } from 'react';
import Dashboard from '../Dashboard';
import UserCard from '../../../components/V3/UserCard';
import UpgradeCard from '../../../components/V3/UpgradeCard';
import { personalizedMatches } from '../../../apis/matches';
import { connectUser, skipUser, socket } from '../../../socket/SocketManager';
import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import UserStore from '../../../contexts/UserStore';
import LoadingMatches from './Loading';
import VerificationModal from './VerificationModal';
import BalanceModal from './balanceModal';
import NoMatches from './NoMatches';

const Matches = () => {

      const { user, setUser, matchesTab, dispatchMatchesTab } = useContext(UserStore);
      const [matches, setMatches] = useState([]);
      const [loading, setLoading] = useState(false);
      const [modal, setModal] = useState(false);
      const [balanceModal, setBalanceModal] = useState(false);

      const fetchMatches = useCallback(async () => {
        setLoading(true);
        const res = await personalizedMatches();
        setMatches(res?.userMatches);
        setLoading(false); 
      },[socket, user]);

      useEffect(()=>{
        fetchMatches();
      },[fetchMatches]);

      useEffect(() => {
        socket.on('matchClient', (data) => {
          if(data.success && data?.type === 'skip'){
            toast.success('success')
            fetchMatches();
          }else if(data.success && data.type === 'connection'){
              if(!data?.balance){
                setBalanceModal(true);
              }
              if(data?.user){
                setUser(data?.user)
              }
          }
        
          if(!data.success){
            toast.error(data?.errorMessage || 'Something went wrong, Try again later');
          }
        })

        

        return () => {
          socket.off('matchClient');
          socket.off('skipUser');
        };
      },[socket]);

      const handleSkipUser = async (userId) =>{
          if(user?.verification?.status !== 'verified'){
            setModal(true);
            return;
          }
          setMatches(prevMatches => prevMatches.filter(user => user?._id !== userId));
          await skipUser(userId);
          setMatches(prevMatches => {
            if (prevMatches.length === 0) {
              fetchMatches();
            }
            return prevMatches;
          });
      };

      const handleConnect = async (connect_id) => {
        if(user && user?.verification?.status !== 'verified'){
          setModal(true);
          return;
        };
        if(user?.wallet?.balance < 100){
            setBalanceModal(true);
            return;
        }
        setMatches(prevMatches => prevMatches.filter(user => user?._id !== connect_id));
        await connectUser(connect_id);
        setMatches(prevMatches => {
          if (prevMatches.length === 0) {
            fetchMatches();
          }
          return prevMatches;
        });
      };

    const tabItems =  [
      {name: 'Your matches', actionName: 'YOUR_MATCHES', state: 'your_matches'},
      {name: 'Handpicked choices', actionName: 'HANDPICKED_CHOICES', state: 'handpicked_choices'},
  ];

  const buttons = [
    {name: 'Skip', action: handleSkipUser, icon: IoClose },
    {name: 'Connect', action: handleConnect, icon: FaHeart},
  ]


  if(!user?.partner_preference_completed || !user?.profile_completed){
    return (
        <Dashboard tabItems={tabItems} tabEdit={matchesTab} tabDispatch={dispatchMatchesTab}>
          <div className="h-90 flex flex-col justify-center items-center gap-2">
                {
                  !user?.partner_preference_completed && !user?.profile_completed ?
                  <p className='text-md font-medium'>Please completed your  Profile & Partner prefernce to get personalized matches</p>
                  : !user?.profile_completed ?
                  <p className='text-md font-medium'>Please completed your Profile to get personalized matches</p>
                  : !user?.partner_preference_completed ?
                  <p className='text-md font-medium'>Please completed your Partner prefernce to get personalized matches</p>
                  : null
                }
            </div>
        </Dashboard>
    )
  }

  if(!loading && matches?.length === 0){
    return (
      <Dashboard tabItems={tabItems} tabEdit={matchesTab} tabDispatch={dispatchMatchesTab}>
          <NoMatches/>
      </Dashboard>
    
    )
  }
    return (
        <Dashboard tabItems={tabItems}>
            {
              
              !loading ? 
                <div className='w-full h-full flex gap-16 justify-center lg:justify-start items-between mt-5 flex-wrap'>
                  {
                      matches?.map((_, index)=> (
                          <UserCard key={index} type={'match'} data={matches[index]} buttons={buttons} blockAfterAction={fetchMatches}/>
                      ))
                  }
                  <UpgradeCard/>
                </div>
                : 
                <div className='w-full h-60 min-h-min flex gap-16 justify-center items-center mt-5 flex-wrap'>
                  <LoadingMatches title={'Finding your matches'}/>
                </div>
            }
            {
              <>
              <>
                {
                  modal &&
                  <VerificationModal open={modal} setOpen={setModal} verificationStatus={user?.verification?.status} verificationNote={user?.verification?.note}/>
                }
                {
                  balanceModal &&
                  <BalanceModal open={balanceModal} setOpen={setBalanceModal}/>
                }
              </>
              
              </>
            }      
        </Dashboard>
    )
};

export default Matches;