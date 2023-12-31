import React from 'react'
import { Link } from 'react-router-dom';
import JoinSvg from '../../../../assets/images/join_section.svg';


const JoinCoupleSquad = () => {
  return (
    <div className='w-full h-fit flex flex-col lg:flex-row items-center justify-center mt-10'>
                <div className="w-full lg:w-5/6 flex flex-col lg:flex-row p-4 lg:p-0 items-center gap-10 lg:gap-2">
                    <div className="flex flex-1 flex-col justify-center gap-5">
                        <h2 className='capitalize text-4xl lg:text-5xl leading-snug font-bold '>join couple squad</h2>
                        <h4 className='text-2xl font-semibold'>Step into a World of Genuine Connections</h4>
                        <h6 className='text-lg font-medium leading-snug'>Today is the perfect day to enrich your life with new, interesting people :)</h6>
                        <p className='font-light text-md leading-relaxed text-justify'>
                            Enrich your life with meaningful connections today.<br/> CoupleSquad is your space for companionship, safety, and unforgettable moments  
                        </p>
                        {/* <p className='font-light text-md leading-relaxed text-justify'>
                            With CoupleSquad, you’re not just joining a dating site; you’re becoming part of a vibrant community where each member is verified and intentions are clear. Our platform is a celebration of authenticity, diversity, and genuine bonds that stand the test of time.
                            So why wait? The possibilities are endless, and someone out there is looking for someone just like you. Sign up today and let the adventure begin!
                        </p> */}
                        <div className="w-full flex justify-center lg:justify-start items-center">
                            <Link to="/signup" className="w-fit lg:w-2/6 text-white bg-brandRed px-4 py-4 lg:py-3 text-center capitalize rounded-3xl">
                                Sign Up and Connect
                            </Link>
                        </div>  
                       
                    </div>
                    <div className="flex flex-1 justify-end items-end p-4">
                        <img src={JoinSvg} alt="Join Couple Squad" className='w-full lg:w-3/4 h-full'/>
                    </div>
                </div>
            </div>
  )
}

export default JoinCoupleSquad