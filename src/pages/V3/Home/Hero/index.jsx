import React from 'react';
import HeroImage from '../../../../assets/landing_hero.jpg';
import { Link } from 'react-router-dom';

export default function HeroSection () {
    return (
        <div className="w-full flex flex-col-reverse lg:flex-row  min-h-[348px]">
            <div className="flex flex-1 flex-col justify-center items-center bg-brandBlue p-4 lg:p-3">
                <div className="w-full xl:w-4/5 flex flex-col gap-8"> 
                    <h1 className="text-white font-bold capitalize text-4xl lg:text-5xl leading-snug">Your perfect connection awaits</h1>
                    <p className="w-full lg:w-5/6 text-start text-white font-light text-lg  leading-relaxed">
                        Discover the art of matchmaking with CoupleSquad.<br/> Our exclusive, invite-only network is where Malayalees worldwide find love and lasting
                        bonds.<br/> Ready to write your love story?
                    </p>
                    <Link to="/signup" className="w-fit text-black  bg-white font-semibold px-5 py-4 text-center capitalize rounded-3xl">Join the community</Link>
                </div>
                
            </div>
            <div className="flex flex-1">
                <img src={HeroImage} alt="hero_image" className='w-full h-full'/>
            </div>
        </div>
    )
}