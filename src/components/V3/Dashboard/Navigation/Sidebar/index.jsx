import React from 'react';
import { sidebarLinks } from '../links';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {

  const { pathname } = useLocation();

  return (
    <div className='space-y-3 p-4 w-fit shadow-2xl shadow-gray-500 hidden md:block bg-white'>
        {
            sidebarLinks.map((tab, index) => (
                <Link to={`/dashboard${tab.link}`} key={index} className={`flex gap-2 items-center cursor-pointer  text-gray-600 px-4 py-2 rounded-2xl `}>
                     
                    <h3 className={`text-xl ${pathname === `/dashboard${tab.link}` && 'text-brandRed font-medium'}`}>{tab.title}</h3>
                </Link>
            ))
        }
    </div>
  )
}

export default Sidebar