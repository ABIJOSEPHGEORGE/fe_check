import { Spin } from 'antd';
import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { status } from '../../../apis/auth';
import { Header, Sidebar } from '../../../components/V3/Dashboard';
import UserStore from '../../../contexts/UserStore';
import { connectSocket, socket, disconnectSocket, updateOnlineStatus } from '../../../socket/SocketManager';
import UserCard from '../../../components/V3/UserCard';
import { TbPencil } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { RiSkipDownLine } from "react-icons/ri";
import { motion } from 'framer-motion';


const Dashboard = ({tabItems, tabEdit, tabDispatch, children}) => {
  const { user, session, setUser, setSession, profilePreview, setProfilePreview } = useContext(UserStore);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);

  const { pathname }= useLocation();

  const socketRef = useRef(socket);


  const fetchUserInfo = useCallback(async () => {
    if (!user) {
      try {
        const res = await status();

        if (!res) {
          localStorage?.removeItem("session");
          setSession(null);
          setLoading(false);
          navigate("/login", { replace: true });
          return;
        }
        setUser(res);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user, session, navigate]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo, navigate]);

  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  useEffect(()=>{
    if(socket){
      socket.on('clientCoinBalanceUpdate', (data) => {
        if(data?.success){
          setUser({...user, wallet:{...user?.wallet, balance: data?.balance}});
        }
      })
  
      return ()=>{
        socket.off('clientCoinBalanceUpdate')
      }
    }
  },[socket])

  useEffect(() => {
    connectSocket();
    updateOnlineStatus();
    console.log('socket connected');

    return () => disconnectSocket();
  }, [user]);

  if (loading) {
    return (
      <div className='p-4 flex flex-col h-screen justify-center items-center'>
        <Spin />
      </div>
    );
  }

 

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 3}} className='relative overflow-y-hidden max-h-screen'>
      <Header/>
      <div className="flex flex-col-reverse md:flex-row flex-1 justify-between gap-4 bg-gray-100 min-h-screen max-h-screen">
          <Sidebar/>
          <div className={` flex flex-col lg:flex-row flex-1 gap-3 ${pathname === '/dashboard' && !editProfile && 'hidden lg:flex'}  items-center lg:place-items-start lg:px-2 py-4 mb-10 lg:mb-60 overflow-y-scroll scroll-smooth scrollbar-hide relative`}>
           <div className={`w-full max-w-5xl md:max-w-sm lg:max-w-md xl:max-w-5xl xxl:max-w-screen-2xl flex  mt-2 lg:-mt-10 z-40 fixed ${pathname === '/dashboard' && profilePreview ? 'justify-end' : 'justify-center lg:justify-between'}` }>
            {
              
              tabItems && (
                  <div className={`bg-white w-fit  rounded-full gap-8 items-center p-4 justify-between ${pathname === '/dashboard' && profilePreview && 'hidden'} shadow-xl shadow-gray-200 ${pathname === '/dashboard' && editProfile ? 'flex ' : pathname !=='dashboard' && !editProfile ? 'flex'  : 'hidden lg:flex'}`}>
                    {
                      tabItems?.map((item) => (
                        <li key={item?.name}
                          className={`'font-medium text-sm lg:text-lg list-none cursor-pointer ${tabEdit?.[item?.state] ? 'text-brandRed' : 'text-gray-800'}`}
                          onClick={()=>tabDispatch({type: item?.actionName})}
                        >{item?.name}</li>
                      ))
                    }
                  </div>
              )
            }
            {
              pathname === '/dashboard' &&
              <button type="button" className="bg-brandRed rounded-full text-white text-md hidden lg:flex justify-center items-center w-24 py-2 h-fit" onClick={()=>setProfilePreview(!profilePreview)}>
                {profilePreview ? 'Edit' : 'Preview'}
              </button>
            }
           </div>
            <div className={`w-full px-2 md:px-4 lg:px-0  mb-10 lg:mb-0 ${pathname === '/dashboard' && profilePreview ? 'flex flex-col mt-2 gap-3' : pathname === '/dashboard' && editProfile ? 'flex flex-col mt-20 gap-3' : pathname==='/dashboard' && !editProfile ? 'hidden lg:block' : 'flex'}`}>
              {
                editProfile && 
                <div className="w-full flex justify-center items-center lg:hidden">
                  <button type='button' className='p-2 rounded-full bg-brandRed text-white text-center lg:hidden' onClick={()=> setEditProfile(!editProfile)}><RiSkipDownLine size={20}/></button>
                </div>
              }
              <div className={`${pathname==="/dashboard" && profilePreview ? 'mt-0' : pathname === '/dashboard/messages' ? 'mt-14 lg:mt-0' : 'mt-2 lg:mt-6'} w-full`}>
                { children }
              </div>
            </div>
          </div>
          <div className={`flex items-center lg:max-w-xs flex-1 flex-col px-4 h-fit gap-8 lg:gap-0 ${pathname !== '/dashboard' ? 'hidden lg:flex' : pathname === '/dashboard' && editProfile ? 'hidden lg:flex' : 'flex'}`}>
              <div className={`mt-5 lg:-mt-16`}>
                <UserCard/>
              </div>
              <div className={`lg:hidden  flex items-center gap-2`} onClick={()=>setEditProfile(!editProfile)}>
                <div  className='flex justify-center items-center flex-col'>
                    <button className={`rounded-full w-fit p-3 bg-brandRed text-white`} type='button' onClick={()=>setProfilePreview(true)}>{<FaRegUser size={20}/>}</button>
                    <p className='text-gray-600 capitalize'>View Profile</p>
                </div>
                <div  className='flex justify-center items-center flex-col'>
                    <button className={`rounded-full w-fit p-3 bg-brandRed text-white`} type='button' onClick={()=>{setProfilePreview(false); setEditProfile(true)}}>{<TbPencil size={20}/>}</button>
                    <p className='text-gray-600 capitalize'>Edit Profile</p>
                </div>
              </div>
          </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
