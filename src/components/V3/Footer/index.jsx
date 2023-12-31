import React from 'react'
import { Link } from 'react-router-dom'
import coupleSquadLogo from '../../../assets/images/couple_squad_logo_trans.png';
import scrollTop from '../../../assets/icons/scroll_top.svg';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  };

  return (
    <div className="w-full h-fit p-3 flex bg-gray-200 flex-col lg:items-center relative">
        <div className="w-full flex flex-col gap-5 justify-between items-center lg:flex-row lg:items-start lg:p-6 lg:w-3/4"> 
            <div className="flex flex-col w-full justify-center items-start lg:justify-start">
              <div className="w-full h-full">
                <img src={coupleSquadLogo} alt="couple squad" className='w-1/4 h-1/4 lg:w-1/4' />
              </div>
              <div className="space-y-3">
                  <h5 className='text-medium text-lg capitalize'>Couple Squad in social networks</h5>
                  <div className="flex gap-3">
                    <Link className=' cursor-pointer'><Instagram /></Link>
                    <Link className=' cursor-pointer'><Facebook/></Link>
                    <Link className=' cursor-pointer'><Twitter/></Link>
                  </div>
              </div>
            </div>
            <div className="flex gap-5 md:w-full md:gap-20">
              <div className="flex flex-col justify-center items-start gap-5">
                  <Link className='font-medium text-lg'>Registration</Link>
                  <Link className='font-medium text-lg'>Login</Link>
                  <Link className='font-medium text-lg'>About Couple Squad</Link>
                  <Link className='font-medium text-lg'>How it works</Link>
                  <Link className='font-medium text-lg'>Blog</Link>
              </div>
              <div className="flex flex-col justify-center items-between gap-5">
                  <Link className='font-medium text-lg'>Customer Support</Link>
                  <Link className='font-medium text-lg'>Contact Us</Link>
                  <Link className='font-medium text-lg'>Privacy Policy</Link>
                  <Link className='font-medium text-lg'>Terms of service</Link>
                  <Link className='font-medium text-lg'>FAQs</Link>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start">

            </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-3">
            <hr className='bg-gray-400 w-3/4 h-1'/>
            <p className='text-md md:text-lg text-gray-800'>© {new Date().getFullYear()} CoupleSquad. All Rights Reserved.</p>
        </div>
        <div className="absolute top-5 right-5 cursor-pointer" onClick={scrollToTop}>
            <img src={scrollTop} alt="scroll towards up" />
        </div>
    </div>
  )
}

export default Footer