import React from 'react'

const DatrimonySection = () => {
  return (
    <div className="w-full min-h-[1280px] lg:min-h-[1400px] flex items-center justify-center py-4 bg-landing-vector bg-cover  bg-no-repeat">
                <div className="w-4/5 flex flex-col lg:flex-row justify-center items-center">
                    <div className='flex flex-1 justify-center'>
                        image
                    </div>
                    <div className="flex flex-1 flex-col h-full mt-80 gap-5 justify-end items-start text-white">
                        <h2 className='capitalize text-4xl lg:text-5xl leading-snug font-bold '>Discover Datrimony™ by CoupleSquad</h2>
                        <h4 className='text-xl lg:text-2xl font-semibold'>Experience the Datrimony™ Difference</h4>
                        <h6 className='text-lg leading-snug'>True compatibility meets personalised matchmaking here. Begin a journey of profound, personal love today</h6>
                        <button className="w-fit text-black bg-white px-4 py-4 lg:py-3 font-semibold text-center capitalize rounded-3xl">Explore Datrimony™</button>
                    </div>
                </div>
            </div>
  )
}

export default DatrimonySection;