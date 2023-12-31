import React from 'react'
import whoJoinImage from '../../../../assets/images/who_join.JPG'

const WhoJoinsSection = () => {
  return (
    <div className='w-full h-fit flex flex-col items-center justify-center p-4 lg:p-6'>
                <div className="w-full lg:w-4/5 flex flex-col-reverse lg:flex-row items-center justify-center">
                    <div className="flex flex-1 p-2 lg:p-6">
                        <img src={whoJoinImage} alt="Join Couple Squad" className='h-full lg:h-3/4 w-full lg:w-4/5'/>
                    </div>
                    <div className="flex flex-1 flex-col gap-5">
                        <h2 className='capitalize text-4xl lg:text-5xl leading-snug font-bold '>Who joins couple squad</h2>
                        <h4 className=' capitalize text-2xl font-semibold'>Designed for authentic connections</h4>
                        <p className='font-normal lg:font-light text-md leading-relaxed text-justify'>
                            CoupleSquad welcomes a kaleidoscope of hearts, united by a common quest for genuine connection and cultural resonance.
                        </p>
                        <p className='font-normal lg:font-light text-md leading-relaxed text-justify'>
                            Our exclusive, community celebrates each journey, each story.
                            Here, professionals and dreamers alike find common ground in their search for lasting love. From captivating
                            mixers to insightful coaching sessions, every step on our platform is a stride toward the love you deserve.
                        </p>
                    </div>
                </div>
            </div>
  )
}

export default WhoJoinsSection