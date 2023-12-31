import React from 'react';
import RedEclipse from '../../../../assets/bg-eclipse-red.png';

const WelcomeSection = () => {
  return (
    <div className='w-full flex justify-center items-center h-fit p-4 lg:p-8 relative'>
                <div className="w-full lg:w-4/5 flex flex-col items-center justify-center lg:flex-row">
                    <div className="flex flex-1 flex-col gap-5">
                        <h2 className=' capitalize text-4xl lg:text-5xl  font-bold leading-snug'>Welcome to couple squad</h2>
                        <h4 className=' capitalize  text-xl lg:text-2xl  font-semibold'>Where Every Match is a Potential Adventure</h4>
                        <p className='font-normal lg:font-light text-md  leading-relaxed text-justify'>
                            Embark on a journey of connection with CoupleSquad, the sanctuary for discerning individuals seeking more than just a date, but a lifetime partner. 
                        </p>
                        <p className="font-normal lg:font-light text-md  leading-relaxed text-justify">
                            Our exclusive platform is designed with Malayalees in mind, fostering a global community where tradition meets modern love.<br/>
                            Join us, where every match is handpicked, every event is memorable, and every story is a testament to love`s enduring magic.
                        </p>
                    </div>
                    <div className="flex flex-1 flex-col text-center">
                        chat window
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 hidden lg:visible">
                        <img src={RedEclipse} alt="couple_squad" />
                    </div>
            </div>
  )
}

export default WelcomeSection;