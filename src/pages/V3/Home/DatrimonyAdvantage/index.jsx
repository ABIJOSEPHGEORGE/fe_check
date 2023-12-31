import React from 'react'
import HeartGlass from '../../../../assets/icons/heart_glass.png';
import BubbleHeart  from '../../../../assets/icons/speech_bubble.png';
import VerifiedBadge  from '../../../../assets/icons/verified_badge.png';

const DatrimonyAdvantages = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center py-4 gap-3">
                <h2 className='capitalize text-3xl lg:text-4xl leading-snug font-bold text-center '>The Datrimony™ Advantage</h2>
                <div className="w-full lg:w-4/5 p-4 flex flex-col lg:flex-row justify-center md:items-center  lg:items-between gap-8">
                    <div className='w-full md:w-3/4 lg:w-2/6 bg-gray-100 rounded-3xl flex flex-col justify-between items-start gap-3 p-4'>
                        <div className="w-1/5 h-1/4">
                             <img src={HeartGlass} className='w-full h-full' alt="couple squad" />
                        </div>
                        <h4 className='font-semibold text-lg'>Personalized Matchmaking</h4>
                        <h6 className='text-md font-medium text-gray-900'>Matchmaking redefined for cultural depth and connection</h6>
                        <p className='font-normal text-md text-gray-800'>Unlike any other service, Datrimony™ offers an individualized approach to finding your perfect match. 
                            Our expert matchmakers use sophisticated algorithms alongside personal insights to select matches that align with your unique preferences and desires
                        </p>
                    </div>
                    <div className='w-full md:w-3/4 lg:w-2/6 bg-gray-100 rounded-3xl flex flex-col justify-between items-start gap-4 p-4'>
                        <div className="w-1/5 h-1/4">
                             <img src={BubbleHeart} className='w-full h-full' alt="couple squad" />
                        </div>
                        <h4 className='font-semibold text-lg'>Effortless Communication</h4>
                        <h6 className='text-md font-medium text-gray-900'>Start genuine conversations and discover the depth of your connection</h6>
                        <p className='font-normal text-md text-gray-800'>With Datrimony™, initiating a conversation is as effortless as it is meaningful.
                         Our platform facilitates a natural and immediate dialogue, allowing you to discover the depth of your connection right from the start.
                        </p>
                    </div>
                    <div className='w-full md:w-3/4 lg:w-2/6 bg-gray-100 rounded-3xl flex flex-col justify-between items-start gap-4 p-4'>
                        <div className="w-1/5 h-1/4">
                             <img src={VerifiedBadge} className='w-full h-full' alt="couple squad" />
                        </div>
                        <h4 className='font-semibold text-lg'>Authenticity Guaranteed</h4>
                        <h6 className='text-md font-medium text-gray-900'>Trust in the safety and discretion of genuine profiles</h6>
                        <p className='font-normal text-md text-gray-800'>
                            Datrimony™ upholds the highest standards of authenticity.
                            We guarantee that the profiles you meet are thoroughly vetted and genuinely interested in forging a serious relationship, ensuring a safe and trustworthy environment
                        </p>
                    </div>
                </div>
            </div>
  )
}

export default DatrimonyAdvantages