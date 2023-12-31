import React, { useState, useContext } from "react";
import { Menu, XCircle } from 'lucide-react';
import logo from '../../../assets/couple-squad-logo.png';
import { Link } from 'react-router-dom';
import UserStore from '../../../contexts/UserStore';

const navbarMenu = [
    {
        title: "Datrimony™",
        link: "",
    },
    {
        title: "About Us",
        link: "",
    },
    {
        title: "Support",
        link: "",
    }
]


const Header = () => {
  const { user, session } = useContext(UserStore);
  const [menuOpen, setMenuOpen] = useState(false);

 

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <div className="w-full h-20 md:h-32 lg:h-20 flex flex-col items-center justify-center p-4 overflow-y-hidden">
      <div className="w-full lg:w-11/12 h-full flex justify-between items-center">
        <div className="w-2/5 md:w-1/6 lg:w-[256px] p-2 lg:p-6 cursor-pointer">
          <Link to={'/'}>
          <img src={logo} alt="couple_squad_logo" className="w-full h-full" />
          </Link>
        </div>

        {
            !menuOpen ?
            <Menu className='text-4xl lg:hidden' size={40} onClick={toggleMenu}/>
            :
            <XCircle className='text-4xl lg:hidden' size={40} onClick={toggleMenu}/>
        }

        {menuOpen && (
          <div className="w-full h-fit flex flex-col justify-start items-center bg-transparent z-50 fixed top-20 left-0 overflow-auto lg:hidden">
            <div className="w-full flex flex-col justify-start bg-white rounded-b-3xl">
                <ul className="w-full p-4 text-gray-600 font-light text-lg list-none">
                {navbarMenu.map((item, index) => (
                    <li
                    key={index}
                    className="w-full p-2 cursor-pointer font-semibold hover:bg-gray-100"
                    >
                    {item.title}
                    </li>
                ))}
                </ul>
                {
                  !user && !session ?
                    <div className="w-full flex flex-col gap-2.5 p-5">
                      <Link to={'/login'} className="py-2 px-4 text-center text-lg font-semibold">Log In</Link>
                      <Link to={'/signup'} className="w-full  py-3 px-4 text-center rounded-3xl bg-brandRed text-white text-lg font-semibold">
                          Sign Up
                      </Link>
                    </div>
                  :
                  <div className="w-full flex flex-col gap-2.5 p-5">
                    <Link to={'/dashboard'} className="w-full py-3 px-4 text-center rounded-3xl bg-brandRed text-white text-lg font-semibold">
                        Dashboard
                    </Link>
                  </div>
                }
                
            </div>
          </div>
        )}

        {/* Navbar items with login/signup buttons for desktop devices */}
        <div className=" w-fit h-full flex-row items-center justify-end gap-10 hidden lg:flex lg:visible">
          {navbarMenu.map((item, index) => (
            <li
              key={index}
              className=" whitespace-nowrap text-gray-600 font-light text-lg  list-none cursor-pointer"
            >
              {item.title}
            </li>
          ))}
          <div className="w-4/6 gap-2.5 justify-end">
            {
                !user && !session ?
                <>
                  <Link to={'/login'} className="py-2 px-4 text-center text-lg">Log in</Link>
                  <Link to={'/signup'} className="py-2 px-4 text-center rounded-3xl text-lg bg-brandRed bg-opacity-85 text-white">
                    Sign Up
                  </Link>
                </>
                :
                <Link to={'/dashboard'} className="py-2 px-4 text-center rounded-3xl text-lg bg-brandRed bg-opacity-85 text-white">
                    Dashboard
                </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

