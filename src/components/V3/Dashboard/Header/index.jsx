import React, { useState } from 'react';
import coupleSquadLogo from '../../../../assets/icons/couple_squad_logo_trans.svg';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../Navigation/links';
import { socket } from '../../../../socket/SocketManager';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage?.removeItem('session');
    navigate('/', {replace: true});
    //mark as disconnected
    socket.emit('markAsOffline');
  }

  const { pathname } = useLocation();

  return (
    <>
      <div className="w-full h-fit lg:h-60 lg:flex justify-between items-start px-6 overflow-y-hidden lg:bg-black lg:bg-blend-overlay lg:bg-opacity-10 lg:bg-cover_placeholder lg:bg-cover lg:bg-center">
        <div className="w-full flex items-center">
          {/* Burger menu button on small screens */}
          <div className="md:hidden flex items-center mr-4">
            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          {/* Logo in the center */}
          <div className="flex flex-1 justify-center md:justify-start">
            <Link to={'/'} className="w-32 cursor-pointer">
              <img src={coupleSquadLogo} alt="couple squad" className="w-full h-full object-cover" />
            </Link>
          </div>

          {/* Hide logout button on small screens */}
          <div className="hidden md:flex flex-1 items-center justify-end">
            <button className='bg-brandRed text-white rounded-full py-2 px-4 w-fit' onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar menu */}
      {menuOpen && (
        <div className="bg-black md:hidden bg-opacity-20 w-full fixed inset-0 cursor-pointer z-50" onClick={()=>setMenuOpen(!menuOpen)}>
          <div className="bg-white w-3/4 h-full space-y-3 p-4" onClick={(e)=>e.stopPropagation()}>
              {
                sidebarLinks.map((tab, index) => (
                    <Link to={`/dashboard${tab.link}`} key={index} className={`flex gap-2 items-center cursor-pointer  text-gray-600 px-4 py-2 rounded-2xl ${pathname === `/dashboard${tab.link}` && 'bg-brandRed bg-opacity-80 text-white'}`}>
                          {
                              pathname === `/dashboard${tab.link}` ?
                              React.cloneElement(tab.activeIcon, {size: '25', color:'white'})
                              :
                              React.cloneElement(tab.icon, {size: '25'})
                          }
                        <h3 className={`text-xl font-medium `}>{tab.title}</h3>
                    </Link>
                ))
            }
          </div>
        </div>
   
      )}
    </>
  );
};

export default Header;
