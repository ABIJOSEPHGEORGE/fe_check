import React, { useContext } from 'react';
import { CiEdit } from "react-icons/ci";
import { GiTwoCoins } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { LuCrown } from "react-icons/lu";
import { RiProfileLine } from "react-icons/ri";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link, useNavigate } from 'react-router-dom';
import UserStore from '../../../../contexts/UserStore';

const ProfileMenu = () => {

    const { user, setSession, setUser } = useContext(UserStore);
    const navigate = useNavigate();

    const logOut = () => {
        if (user || session || localStorage?.getItem("session")) {
            localStorage?.removeItem("session");
            setSession(null);
            setUser(null);
            navigate('/');
        }
    };

    return (
        <div className="w-full lg:w-1/5 h-fit flex flex-col rounded-md gap-3 bg-white shadow-2xl shadow-gray-200 z-50 fixed top-20 right-0 lg:right-2">
           <Link to={'/dashboard/wallet'} className="flex gap-3 items-center p-3">
                <div className="rounded-md bg-yellow-400 bg-opacity-75 p-2">
                    <GiTwoCoins size={30} color='white'/>
                </div>
                <div className="flex flex-col justify-center">
                    <h5 className='text-lg font-light'>Wallet</h5>
                    <p className='font-light text-medium'>Balance: {user?.wallet?.balance || <Skeleton/>}</p>
                </div>
           </Link>
           <Link className="flex gap-3 items-center p-3 cursor-pointer" to={'/dashboard/edit-profile'}>
                <div className="rounded-md bg-blue-500 bg-opacity-75 p-2">
                    <RiProfileLine size={30} color='white'/>
                </div>
                <h5 className='text-lg font-light'>Edit Profile</h5>
           </Link>
           <Link to={'/dashboard/edit-partner-preferences'} className="flex gap-3 items-center p-3">
                <div className=" rounded-md bg-brandRed bg-opacity-75 p-2">
                    <CiEdit size={30} color='white'/>
                </div>
                <h5 className='text-lg font-light'>Edit Partner Preference</h5>
           </Link>
           <div className="flex gap-3 items-center p-3 lg:hidden">
                <div className=" rounded-md bg-brandBlue bg-opacity-75 p-2">
                    <LuCrown size={30} color='white'/>
                </div>
                <h5 className='text-lg font-light'>Upgrade</h5>
           </div>
           
           <div className="flex gap-3 items-center p-3 justify-center">
                <button className='px-8 text-center py-4 lg:py-2 w-fit font-semibold text-white bg-brandRed rounded-full lg:rounded-md flex gap-2 items-center' onClick={()=>logOut()}>Logout <IoIosLogOut size={15}/></button>
           </div>
        </div>
    )
};

export default ProfileMenu;