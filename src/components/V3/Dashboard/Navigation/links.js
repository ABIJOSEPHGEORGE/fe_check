import React from 'react';
import { BiUser } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdPlaylistAddCheck } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { PiUserList } from "react-icons/pi";
import { RiMessage3Line } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { IoWalletSharp } from "react-icons/io5";

export const sidebarLinks =  [
    {
        title: 'Profile',
        link: '',
        icon: <BiUser/>,
        activeIcon: <BiSolidUser/>,
        mobile: true,
    },
    {
        title: 'Matches',
        link: '/matches',
        icon: <AiOutlineHeart/>,
        activeIcon: <FaHeart/>,
        mobile: true,
    },
    
    {
        title: 'Connections',
        link: '/connections',
        icon: <PiUserList/>,
        activeIcon: <PiUserListFill/>,
        mobile: true,
    },
    {
        title: 'Shortlisted',
        link: '/shortlisted',
        icon: <MdOutlinePlaylistAddCheck />,
        activeIcon:<MdPlaylistAddCheck/>,
        mobile: true,
    },
    {
        title: 'Messages',
        link : '/messages',
        icon: <RiMessage3Line/>,
        activeIcon: <RiMessage3Fill/>,
        mobile: true,
    },
    {
        title: 'Wallet',
        link : '/wallet',
        icon: <IoWalletOutline/>,
        activeIcon: <IoWalletSharp/>,
        mobile: false,
    }
]